const Router = require('koa-router')
const Config = require('../config')
const axios = require('axios')
const _ = require('lodash')
const {success,error,md5} = require('../utils')
const router=new Router({
    prefix:'/user'
});


/**
 * 登录
 */
router.post('/login',async (ctx,next)=>{
    const {code,userInfo} = ctx.request.body
    
    const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session',{
        params: {
            appid:Config.APPID,
            secret:Config.SECRET,
            js_code:code,
            grant_type:'authorization_code'
        }
    })
    const openid = res.data.openid
    
    
    let user=await ctx.model.User.findOne({
        where:{openid}
    });
    if(_.isNil(user)){
        user = await ctx.model.User.create({
            openid,
            ...userInfo
        })
        
    }
    ctx.session.user=user;
    ctx.body=success(user)
})


module.exports=router;
