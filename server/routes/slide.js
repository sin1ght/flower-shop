const Router = require('koa-router')
const _ = require('lodash')
const {success,error,md5} = require('../utils')
const router=new Router({
    prefix:'/slide'
})


/**
 * 添加轮播图
 */
router.post('/add',async (ctx,next)=>{
    const {url} = ctx.request.body

    const slide = await ctx.model.Slide.create({
        url
    })

    ctx.body = success(slide)
})

/**
 * 根据id删除轮播图
 */
router.post('/delete',async (ctx,next)=>{
    const {id} = ctx.request.body

    const slide =  await ctx.model.Slide.findOne({
        where:{
            id
        }
    })

    slide.destroy()

    ctx.body = success(slide)
})


/**
 * 获取所有轮播图列表
 */
router.get('/',async (ctx,next)=>{
    const slides = await ctx.model.Slide.findAll()
    ctx.body = success(slides)
})



module.exports=router;
