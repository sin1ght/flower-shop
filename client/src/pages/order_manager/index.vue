<template>
    <!-- 订单管理页面 -->
    <div class="order-manager-page">
        <i-tabs :current="currentTab" color="#ffb6b9" @change="handleTabChange">
            <i-tab key="0" title="待付款"></i-tab>
            <i-tab key="1" title="待发货"></i-tab>
            <i-tab key="2" title="待收货"></i-tab>
            <i-tab key="3" title="待评价"></i-tab>
        </i-tabs>

        <!-- 订单列表 -->
        <div class="content">
            <div class="order" v-for="(order,index) in orders" :key="index">
                <header>
                    <p>订单号: {{order.serialNumber}}</p>
                    <p v-if="order.status == 0">等待买家付款</p>
                    <p v-if="order.status == 1">等待卖家发货</p>
                    <p v-if="order.status == 2">等待买家收货</p>
                    <p v-if="order.status == 3">等待买家评论</p>
                </header>
                <!-- 购买的商品 -->
                <div class="products">
                    <div class="product-card" v-for="(record,ix) in order.cartRecords" :key="ix">
                        <image class="image" :src="record.image"></image>
                        <p class="title">{{record.name}}</p>
                        <div class="info">
                            <p>￥{{record.price}}</p>
                            <p>x{{record.num}}</p>
                        </div>
                    </div>
                </div>
                <p class="msg">合计:<span>￥{{order.price}}</span></p>
                <footer v-if="order.status == 0">
                    <div>取消订单</div>
                    <div @click="setOrderStatus(order.id,1)">付款</div>
                </footer>
                <div class="footer" v-if="order.status == 1">
                    <div>提醒发货</div>
                </div>
                <div class="footer" v-if="order.status == 2">
                    <div @click="setOrderStatus(order.id,3)">确认收货</div>
                </div>
                <div class="footer" v-if="order.status == 3">
                    <div>去评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderAPI from '../../api/order'
import Utils from '../../utils/utils'

export default {
    name:'order-manager-page',
    data(){
        return {
            currentTab:0,
            ordersMap:{}//所有的订单
        }
    },
    async onShow(){
        //获取用户所有订单
       const allOrders = (await OrderAPI.getAll()).data
       this.ordersMap = Utils.createMapFromObjectArray(allOrders)
    },
    computed:{
        orders(){
            //当前tab下的订单
            return Object.values(this.ordersMap).filter(ele=>{
                return ele.status == this.currentTab
            }).reverse()
        }
    },
    methods:{
        setOrderStatus(id,status){
            //处理订单状态
            this.ordersMap[id].status = status

            OrderAPI.setStatus(id,status)
        },
        handleTabChange(e){
            //处理tab切换
            this.currentTab = e.mp.detail.key
        }
    }
}
</script>

<style lang="scss">
.order-manager-page{
    width: 100vw;
    min-height: 100vh;
    background: $light-gray;

    .content{
        padding: 10px;

        .order{
            background: white;
            padding: 10px;
            margin-bottom: 10px;

            header{
                display: flex;

                p{
                    &:first-child{
                        flex-grow: 1;
                    }
                    &:last-child{
                        color: $color-1;
                    }
                }
            }

            .products{
                margin: 10px 0;
                width: 100%;
                border-radius: 10px;
                overflow: hidden;

                .product-card{
                    width: 100%;
                    display: flex;
                    background: white;
                    padding: 10px;
                    align-items: center;
                    border-bottom: 1px solid $light-gray;

                    image{
                        width: 100px;
                        height: 100px;
                        flex-shrink: 0;
                    }

                    .title{
                        flex-grow: 1;
                        margin: 0 10px;
                    }

                    .info{
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        p{
                            &:first-child{
                                color: $color-1;
                                margin-bottom: 5px;
                            }

                            &:last-child{
                                color: $gray;
                            }
                        }
                    }
                }
            }

            .msg{
                padding: 10px 0;
                text-align: right;
                border-bottom: 1px solid $light-gray;

                span{
                    font-size: 20px;
                    color: $color-1;
                }
            }

            footer{
                display: flex;
                justify-content: flex-end;
                padding-top: 10px;

                div{
                    padding: 5px 20px;
                    border-radius: 20px;
                    border: 1px solid $light-gray;

                    &:last-child{
                        padding: 5px 30px;
                        color: $color-1;
                        margin-left: 10px;
                        border: 1px solid $color-1;
                    }
                }
            }

            .footer{
                display: flex;
                justify-content: flex-end;
                padding-top: 10px;

                div{
                    border-radius: 20px;
                    padding: 5px 30px;
                    color: $color-1;
                    border: 1px solid $color-1;
                }
            }
        }
    }
}
</style>