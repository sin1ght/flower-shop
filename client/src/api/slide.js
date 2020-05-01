import { Get } from './http'

const prefix = '/slide'

export default class SlideAPI {
    /**
     * 获取所有轮播图列表
     */
    static async getAll(){
        return Get(prefix + '/')
    }
}