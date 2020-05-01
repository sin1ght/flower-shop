const Router = require('koa-router')
const _ = require('lodash')
const {success,error,md5} = require('../utils')
const Op = require('sequelize').Op
const router=new Router({
    prefix:'/statistics'
});

/**
 * 获取最近7天日期
 */

function getLatest7Days(){
    const results = []
    for (let index = 0; index < 7; index++) {
        const today = new Date()
        const targetDay = new Date()
        targetDay.setTime(today.getTime() - 1000*60*60*24*index)
        const year = targetDay.getFullYear()
        const month = targetDay.getMonth() + 1
        const date = targetDay.getDate()

        results.unshift(`${year}/${month}/${date}`)
    }

    return results
}

/**
 * 数量统计 总销量 订单数量 商品数量 用户数量
 */
router.get('/count',async (ctx,next)=>{
    const ordersCount = await ctx.model.Order.count()
    const productsCount = await ctx.model.Product.count()
    const usersCount = await ctx.model.User.count()

    const salesRecords = await ctx.model.SaleRecord.findAll()

    const sales = salesRecords.reduce((tatal,cur)=>{
        return tatal + cur.num
    },0)

    ctx.body = success({
        ordersCount,productsCount,usersCount,sales
    })
})


/**
 * 最近7天每日新增用户
 */
router.get('/newUsersLatestWeek',async (ctx,next)=>{
    // 最近7天的号数
    const latest7Days = getLatest7Days()
    const latest7DaysMap = {}

    latest7Days.forEach(ele=>{
        latest7DaysMap[ele] = 0
    })
    
    //最近7天的用户
    const latestWeekUsers = await ctx.model.User.findAll({
        where:{
            createdAt:{
                [Op.gte]:new Date(latest7Days[0])
            }
        }
    })

    latestWeekUsers.forEach(user=>{
        const time = user.createdAt
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const date = time.getDate()
        const createdAtTime = `${year}/${month}/${date}`

        latest7Days.forEach(ele=>{
            if(ele == createdAtTime){
                latest7DaysMap[ele] += 1
            }
        })
    })



    ctx.body=success(latest7DaysMap)
})


/**
 * 最近7天商品销量
 */
router.get('/productSalesLatestWeek',async (ctx,next)=>{
    // 最近7天的号数
    const latest7Days = getLatest7Days()
    const latest7DaysMap = {}

    latest7Days.forEach(ele=>{
        latest7DaysMap[ele] = 0
    })

    //最近7天的销售记录
    const latestWeekSaleRecords = await ctx.model.SaleRecord.findAll({
        where:{
            createdAt:{
                [Op.gte]:new Date(latest7Days[0])
            }
        }
    })

    latestWeekSaleRecords.forEach(saleRecord=>{
        const time = saleRecord.createdAt
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const date = time.getDate()
        const createdAtTime = `${year}/${month}/${date}`

        latest7Days.forEach(ele=>{
            if(ele == createdAtTime){
                latest7DaysMap[ele] += saleRecord.num
            }
        })
    })


    ctx.body=success(latest7DaysMap)
})


/**
 * 最近7天商品销量分类占比
 */
router.get('/productSalesLatestWeekCategorys',async (ctx,next)=>{
    // 最近7天的号数
    const latest7Days = getLatest7Days()
    const resulstMap = {}
    
    //最近7天的销售记录
    const latestWeekSaleRecords = await ctx.model.SaleRecord.findAll({
        where:{
            createdAt:{
                [Op.gte]:new Date(latest7Days[0])
            }
        }
    })

    for (let index = 0; index < latestWeekSaleRecords.length; index++) {
        const ele = latestWeekSaleRecords[index]

        const product = await ele.getProduct()
        const category = (await product.getCategory()).name

        if(resulstMap[category]){
            resulstMap[category] += ele.num
        }else{
            resulstMap[category] = ele.num
        }
        
    }
    
    const data = []
    for (const key in resulstMap) {
        data.push({
            value:resulstMap[key],
            name:key
        })
    }

    ctx.body=success({
        categorys:Object.keys(resulstMap),
        data:data
    })
})


/**
 * 商品总销量分类占比
 */
router.get('/productSalesCategorys',async (ctx,next)=>{
    const resulstMap = {}
    
    //最近7天的销售记录
    const latestWeekSaleRecords = await ctx.model.SaleRecord.findAll()

    for (let index = 0; index < latestWeekSaleRecords.length; index++) {
        const ele = latestWeekSaleRecords[index]

        const product = await ele.getProduct()
        const category = (await product.getCategory()).name

        if(resulstMap[category]){
            resulstMap[category] += ele.num
        }else{
            resulstMap[category] = ele.num
        }
        
    }
    
    const data = []
    for (const key in resulstMap) {
        data.push({
            value:resulstMap[key],
            name:key
        })
    }

    ctx.body=success({
        categorys:Object.keys(resulstMap),
        data:data
    })
})

module.exports=router;
