import { Get } from './http'

const prefix = '/category'

export default class CategoryAPI {
    /**
     * 获取所有分类列表
     */
    static async getAll(){
        return Get(prefix + '/')
    }
}