const Router = require('koa-router')
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const {success,error,md5} = require('../utils')
const router=new Router({
    prefix:'/file'
});

const uploadFilesDir =path.join(__dirname,'../public/upload')
const domain = "http://www.test.com" //暂时的假域名 用于小程序展示图片

/**
 * 图片上传
 */
router.post('/upload',async (ctx,next)=>{
    const file = ctx.request.files.file

    if (!fs.existsSync(uploadFilesDir)) {
        fs.mkdirSync(uploadFilesDir)
    }

    const fileName = md5(new Date().getTime().toString()) + path.extname(file.name)
    const filePath = path.join(uploadFilesDir,fileName)

    const reader = fs.createReadStream(file.path)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    ctx.body = success({
        url:domain +'/upload/' + fileName
    })
    
})

/**
 * 根据图片url 删除
 */
router.post('/delete',async (ctx,next)=>{
    const {url} = ctx.request.body

    const fileName = path.basename(url)
    const filePath = path.join(uploadFilesDir , fileName)

    console.log(filePath)
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath)
    }

    ctx.body = success('删除成功')
})




module.exports=router;
