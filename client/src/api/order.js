import { Post,Get } from './http'

const prefix = '/order'

export default class OrderAPI {
    /**
     * 获取所有订单
     */
    static async getAll(){
        return Get(prefix + '/')
    }

    /**
     *设置订单状态
     */
    static async setStatus(id,status){
        return Post(prefix + '/status',{
            id,status
        })
    }

    /**
     * 添加订单
     */
    static async add(price,message,addressId,cardRecordIds){
        console.log('orderapi.add')
        return Post(prefix + '/add',{
            price,message,addressId,cardRecordIds
        })
    }
}