const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/order'
});


/**
 * 添加订单
 */
router.post('/add',async (ctx,next)=>{
    const  {price,message,addressId,cardRecordIds} = ctx.request.body
    const serialNumber = new Date().getTime().toString()
    const status = 0 //待支付状态
    const userId = ctx.session.user.id

    const order = await ctx.model.Order.create({
        serialNumber,price,status,message
    })
    await order.setUser(userId)
    await order.setAddress(addressId)

    //设置订单内购物车记录的状态为1
    const cardRecords = await Promise.all(cardRecordIds.map(id=>{
        return ctx.model.CartRecord.findByPk(id)
    }))
    cardRecords.forEach(ele=>{
        ele.set('status',1)
        ele.setOrder(order.id)
        ele.save()
    })

    ctx.body = success(order)
})

/**
 * 获取当前用户所有订单
 */
router.get('/',async (ctx,next)=>{
    const user = await ctx.model.User.findByPk(ctx.session.user.id)

    const orders = await user.getOrders()
    const results = await Promise.all(orders.map(async ele=>{
        const temp = ele.toJSON()
        //获取订单的内的购物车记录
        const cartRecordList =await ele.getCartRecords()
        //获取商品名称 和 价格 和 图片
        const promises = cartRecordList.map(async (r)=>{
            const temp = r.toJSON()
            const product = await r.getProduct()
            temp.name = product.name
            temp.price = product.price
            temp.image = (await product.getImages())[0].url

            return temp
        })
        temp.cartRecords = await Promise.all(promises)

        return temp
    }))

    ctx.body = success(results)
})

/**
 * 设置订单状态
 */
router.post('/status',async (ctx,next)=>{
    const {id,status} = ctx.request.body

    const order = await ctx.model.Order.findByPk(id)
    order.set('status',status)
    order.save()

    if(status === 1){
        //付款成功 增加销量记录 
        const cartRecords = await order.getCartRecords()
        cartRecords.forEach(async ele=>{
            const product = await ele.getProduct()
            const saleRecord = await ctx.model.SaleRecord.create({
                num:ele.num
            })
            saleRecord.setUser(ctx.session.user.id)
            saleRecord.setProduct(product.id)

            //减少产品的总量
            product.set('amount',product.amount - ele.num)
            product.save()
        })
    }

    ctx.body = success(order)
})

/**
 * 获取所有用户的所有订单
 */
router.get('/all',async (ctx,next)=>{
    const orders = await ctx.model.Order.findAll({
        order:[['createdAt', 'DESC']],
    })
    const results = await Promise.all(orders.map(async ele=>{
        const temp = ele.toJSON()
        //地址信息
        temp.address = (await ele.getAddress()).toJSON()
        //获取订单的内的购物车记录
        const cartRecordList =await ele.getCartRecords()
        //获取商品名称 和 价格 和 图片
        const promises = cartRecordList.map(async (r)=>{
            const temp = r.toJSON()
            const product = await r.getProduct()
            temp.name = product.name
            temp.price = product.price
            temp.image = (await product.getImages())[0].url

            return temp
        })
        temp.cartRecords = await Promise.all(promises)

        return temp
    }))

    ctx.body = success(results)
})


/**
 * 获取某个订单详情 根据id
 */
router.get('/detail',async (ctx,next)=>{
    const {id} = ctx.request.query

    const order = await ctx.model.Order.findByPk(id)

    const result = order.toJSON()
    //地址信息
    result.address = (await order.getAddress()).toJSON()
    //获取订单的内的购物车记录
    const cartRecordList =await order.getCartRecords()
    //获取商品名称 和 价格 和 图片
    const promises = cartRecordList.map(async (r)=>{
        const temp = r.toJSON()
        const product = await r.getProduct()
        temp.name = product.name
        temp.price = product.price
        temp.image = (await product.getImages())[0].url

        return temp
    })
    result.cartRecords = await Promise.all(promises)

    ctx.body = success(result)
})

module.exports=router;
