import { Get,Post } from './http'

const prefix = '/address'

export default class AddressAPI {
    /**
     * 获取所有地址
     */
    static async getAll(){
        return Get(prefix + '/')
    }

    /**
     * 添加地址
     */
    static async add(name,phoneNumber,detail){
        return Post(prefix + '/add',{
            name,phoneNumber,detail
        })
    }
}