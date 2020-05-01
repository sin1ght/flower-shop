const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/category'
});


/**
 * 添加分类
 */
router.post('/add',async (ctx,next)=>{
    const {name} = ctx.request.body

    //名字必须唯一
    const category = await ctx.model.Category.findOne({
        where:{
            name
        }
    })

    if(_.isNil(category)){
        const category =await ctx.model.Category.create({
            name
        })
        ctx.body = success(category)
    }else{
        ctx.body = error('已经存在此分类')
    }
})

/**
 * 获取所有分类
 */
router.get('/',async (ctx,next)=>{
    const categoryList = await ctx.model.Category.findAll()
    ctx.body=success(categoryList)
})


/**
 * 删除分类
 */
router.get('/delete',async (ctx,next)=>{
    const {id} = ctx.request.query

    const category = await ctx.model.Category.findByPk(id)
    if(_.isNil(category)){
        ctx.body = success('非法的id')
    }else{
        category.destroy()
        ctx.body = success('删除成功')
    }
})


/**
 * 更新分类名称
 */
router.post('/update',async (ctx,next)=>{
    const {id,name} = ctx.request.body

    const category = await ctx.model.Category.findByPk(id)
    if(_.isNil(category)){
        ctx.body = success('非法的id')
    }else{
        category.name = name
        category.save()
        ctx.body = success('更新成功')
    }
})

module.exports=router;
