const Router = require('koa-router')
const _ = require('lodash')
const {success,error} = require('../utils')
const router=new Router({
    prefix:'/address'
});


/**
 * 添加地址
 */
router.post('/add',async (ctx,next)=>{
    const {name,phoneNumber,detail} = ctx.request.body
    const address = await ctx.model.Address.create({
        name,phoneNumber,detail
    })

    address.setUser(ctx.session.user.id)

    ctx.body = success(address)
})

/**
 * 获取所有address
 */
router.get('/',async (ctx,next)=>{
    const user = await ctx.model.User.findByPk(ctx.session.user.id)
    const addressList = await user.getAddresses()

    ctx.body=success(addressList)
})


module.exports=router;
