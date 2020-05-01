import { Get,Post } from './http'

const prefix = '/cart_record'

export default class CartRecordAPI {
    /**
     * 添加购物车记录
     */
    static async add(num,productId){
        return Post(prefix + '/add',{
            num,productId
        })
    }

    /**
     * 获取用户所有记录
     */
    static async getAll(){
        return Get(prefix + '/')
    }
}