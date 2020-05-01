const Http = axios.create({
    baseURL: '/api/v1',
    withCredentials: true
})

//根据object数组中object的某个key 创造map
function createMapFromObjectArray(arr,key='id'){
    const tempMap={}
    arr.forEach(ele => {
        tempMap[ele[key]] = ele
    })
    return tempMap
}

/**
 * 格式化时间 xxxx/xx/xx 
 */
function formatTime(time){
    const date = new Date(time)

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${year}/${month}/${day} ${hours}:${minutes}`
}


//获取url中的查询参数
function getUrlQueryValue(queryName) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == queryName) { return pair[1]; }
    }
    return null;
}