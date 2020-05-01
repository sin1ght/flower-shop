import { Get } from './http'

const prefix = '/product'


export default class ProductAPI {
    /**
     * 根据分类id获取产品列表
     */
    static async getByCategory(categoryId){
        return Get(prefix + '/',{
            categoryId
        })
    }

    /**
     * 获取热门产品
     */
    static async getHot(){
        return Get(prefix + '/hot')
    }

    /**
     * 获取最新产品
     */
    static async getLatest(){
        return Get(prefix + '/latest')
    }

    /**
     * 根据产品id获取产品
     */
    static async getById(productId){
        return Get(prefix + '/getById',{
            productId
        })
    }
}