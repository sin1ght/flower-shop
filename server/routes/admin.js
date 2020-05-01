const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/admin'
});


/**
 * 登录
 */
router.post('/login',async (ctx,next)=>{
    const {username,password} = ctx.request.body

    const admin = await ctx.model.Admin.findOne({
        where:{
            username,password
        }
    })

    if(_.isNil(admin)){
        ctx.body = error('登录失败')
    }else{
        ctx.session.admin = admin

        ctx.body = success(admin)
    }
})


module.exports=router;
