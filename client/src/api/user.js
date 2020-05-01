import { Post } from './http'
import { store } from '../store'

const prefix = '/user'

async function WxLogin(){
    return new Promise((resolve,reject)=>{
        wx.login({
            success (res) {
                if (res.code) {
                    resolve(res.code)
                }
            }
        })
    })
}

async function WxGetUserInfo(){
    return new Promise((resolve,reject)=>{
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                store.user.nickName=userInfo.nickName
                store.user.avatarUrl=userInfo.avatarUrl
                resolve({
                    nickName:userInfo.nickName,
                    avatarUrl:userInfo.avatarUrl
                })
            }
        })
    })
}

export default class UserAPI {
    /**
     * 登录
     */
    static async login(){
        const [code,userInfo] = await Promise.all([WxLogin(),WxGetUserInfo()])
        return Post(prefix + '/login',{
            code,
            userInfo
        })
    }
}