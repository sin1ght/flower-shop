import {store} from '../store'


const baseURL = 'http://localhost:5000/api/v1'

async function Get(path,data={}){
    const header = {}

    if(store.cookies.length){
        header.Cookie=store.cookies.join(';')
    }

    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseURL + path,
            data,
            header,
            success (res) {
                resolve(res.data)
            },
            fail(res){
                reject(res)
            }
        })
    })
}

async function Post(path,data={}){
    const header = {}

    if(store.cookies.length){
        header.Cookie=store.cookies.join(';')
    }

    return new Promise((resolve,reject)=>{
        wx.request({
            url: baseURL + path,
            data,
            method:'POST',
            header,
            success (res) {
                if(res.cookies.length){
                    store.cookies = res.cookies
                }
                resolve(res.data)
            },
            fail(res){
                reject(res)
            }
        })
    })
}

export {
    Get,Post
}