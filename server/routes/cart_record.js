const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/cart_record'
});


/**
 * 添加购物车记录
 */
router.post('/add',async (ctx,next)=>{
    const { productId,num } = ctx.request.body

    const record = await ctx.model.CartRecord.create({
        num
    })

    record.setProduct(productId)
    record.setUser(ctx.session.user.id)

    ctx.body = success(record)
})

/**
 * 获取用户所有记录
 */
router.get('/',async (ctx,next)=>{
    const user = await ctx.model.User.findByPk(ctx.session.user.id)

    const cartRecordList = await user.getCartRecords({
        where:{
            status:0
        },
        order:[['createdAt', 'DESC']],
    })

    //获取商品名称 和 价格 和 图片
    const promises = cartRecordList.map(async (ele)=>{
        const temp = ele.toJSON()
        const product = await ele.getProduct()
        temp.name = product.name
        temp.price = product.price
        temp.image = (await product.getImages())[0].url

        return temp
    })

    const results = await Promise.all(promises)

    ctx.body=success(results)
})



module.exports=router;
