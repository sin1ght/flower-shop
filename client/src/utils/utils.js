//根据object数组中object的某个key 创造map
function createMapFromObjectArray(arr,key='id'){
    const tempMap={}
    arr.forEach(ele => {
        tempMap[ele[key]] = ele
    })
    return tempMap
}


export default {
    createMapFromObjectArray
}