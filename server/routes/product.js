const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/product'
});


/**
 * 获取产品的销量
 */
async function getProductSales(product){
    const salesRecords = await product.getSaleRecords()
    let sales = 0

    salesRecords.forEach(ele => {
        sales =sales + ele.num  
    })

    return sales
}

/**
 * 获取产品列表的 销量 和 图片集 和分类
 */
async function getProductListSalesAndImages(productList){
    const promises = productList.map(async (item)=>{
        const temp = item.toJSON()
        //获取产品分类
        temp.category = (await item.getCategory()).toJSON()
        temp.sales = await getProductSales(item)
        temp.images = (await item.getImages()).map((img)=>{
            return img.url
        })
        return temp
    })

    return await Promise.all(promises)
}


/**
 * 根据分类id获取产品列表
 */
router.get('/',async (ctx,next)=>{
    const { categoryId } = ctx.request.query
    const productList = await ctx.model.Product.findAll({
        where:{
            categoryId
        }
    })

    //获取产品销量和图片
    const results = await getProductListSalesAndImages(productList)
    ctx.body=success(results)
})

/**
 * 获取热门产品
 */
router.get('/hot',async (ctx,next)=>{
    const productList = await ctx.model.Product.findAll()

    //获取产品销量和图片
    const results = await getProductListSalesAndImages(productList.slice(5,7))
    ctx.body=success(results)
})


/**
 * 获取最新产品
 */
router.get('/latest',async (ctx,next)=>{
    const productList = await ctx.model.Product.findAll({
        order:[['createdAt', 'DESC']],
        limit:5
    })

    //获取产品销量和图片
    const results = await getProductListSalesAndImages(productList)
    ctx.body=success(results)
})


/**
 * 根据productId 获取唯一 product
 */
router.get('/getById',async (ctx,next)=>{
    const { productId } = ctx.request.query
    const product = await ctx.model.Product.findOne({
        where:{
            id:productId
        }
    })
    //获取产品销量和图片
    const result = product.toJSON()
    result.sales = await getProductSales(product)
    result.images = (await product.getImages()).map(img=>{
        return img.url
    })
    ctx.body = success(result)
})

/**
 * 获取所有产品
 */
router.get('/all',async (ctx,next)=>{
    const productList = await ctx.model.Product.findAll({
        order:[['createdAt', 'DESC']],
    })
    
    //获取产品销量和图片
    const results = await getProductListSalesAndImages(productList)
    ctx.body=success(results)
})

/**
 * 添加商品
 */
router.post('/add',async (ctx,next)=>{
    const {name,price,amount,desc,categoryId,images} = ctx.request.body

    const product = await ctx.model.Product.create({
        name,price,amount,desc
    })

    await product.setCategory(categoryId)

    const imagesModels =  await ctx.model.Image.bulkCreate(images.map(ele=>{
        return {
            url:ele
        }
    }))

    await product.setImages(imagesModels.map(ele=>{
        return ele.id
    }))

    ctx.body = success(product)
})

//更新商品
router.post('/update',async (ctx,next)=>{
    const {id,name,price,amount,desc,categoryId,images} = ctx.request.body

    const product = await ctx.model.Product.findByPk(id)
    product.name = name
    product.price = price
    product.amount = amount
    product.desc = desc
    product.setCategory(categoryId)
    product.save()

    //找出删除的图片 和 新加的图片
    const oldImages = await product.getImages()
    let delImages = [] //image model数组 要删除的
    const addImages = [] // images url 数组 要添加的
    const constantImages = [] //image model数组 不变动的

    images.forEach(ele=>{
        let  temp = oldImages.find(cur=>{
            return cur.url == ele
        })
        if(temp){
            //找到了
            constantImages.push(temp)
        }else{
            addImages.push(ele)
        }
    })
    //过滤掉不变的 就是要删除的
    delImages = oldImages.filter(cur=>{
        let temp = constantImages.find(ele=>{
            return ele.id = cur.id
        })

        return temp === undefined
    })

    //删除图片
    if(delImages.length){
        await Promise.all(delImages.map(async ele=>{
            const image = await ctx.model.Image.findByPk(ele.id)
            await image.destroy()
            return true
        }))
    }

    //添加新的图片
    if(addImages.length){
        const imagesModels =  await ctx.model.Image.bulkCreate(addImages.map(url=>{
            return {
                url
            }
        }))
    
        await product.setImages(imagesModels.map(ele=>{
            return ele.id
        }))
    }

    ctx.body = success(product)
})

module.exports=router;
