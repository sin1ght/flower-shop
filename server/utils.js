const crypto = require('crypto'); 

/**
 * 请求成功返回体
 * @param {object|string} data 
 */
function success(data){
    return {
        status:true,
        data:data
    }
}

/**
 * 请求失败返回体
 * @param {object|string} data 
 */
function error(data){
    return {
        status:false,
        data:data
    }
}


/**
 * md5
 */
function md5(str){
    let hash = crypto.createHash('md5');
    return hash.update(str).digest('hex');
}



module.exports={
    success,
    error,
    md5
}

