<template>
    <!-- 结算页面 -->
    <div class="pay-page">
        <!-- 地址管理 -->
        <div class="address" v-if="address" @click="handleOpenAddressManagerPage">
            <i-icon size="25" type="coordinates_fill" color="#ffb6b9"/>
            <div class="info">
                <p>
                    <span class="name">{{address.name}}</span>
                    <span class="phone">{{address.phoneNumber}}</span>
                </p>
                <p>{{address.detail}}</p>
            </div>
            <i-icon type="enter" color="#80848f"/>
        </div>
        <div class="address" v-else @click="handleOpenAddressAddPage">
            <i-icon size="25" type="add" color="#ffb6b9"/>
            <div class="info">
                添加收获地址
            </div>
            <i-icon type="enter" color="#80848f"/>
        </div>

        <!-- 购买的商品 -->
        <div class="products">
            <div class="product-card" v-for="(record,index) in cartRecords" :key="index">
                <image class="image" :src="record.image"></image>
                <p class="title">{{ record.name }}</p>
                <div class="info">
                    <p>￥{{ record.price }}</p>
                    <p>x{{ record.num }}</p>
                </div>
            </div>
        </div>

        <!-- 其他功能 -->
        <div class="features">
            <div class="item">
                <p class="left">配送费</p>
                <p class="right">￥0</p>
            </div>
            <div class="item">
                <p class="left">优惠券</p>
                <p class="right">暂无可用优惠<i-icon type="enter" color="#80848f"/></p>
            </div>
            <div class="item">
                <p class="left">买家留言</p>
                <p class="right"><input @input="handleInputEvent" :value="message" type="text" placeholder="50字以内"></p>
            </div>
        </div>

        <footer>
            <p>合计:<span>￥{{totalPrice}}</span></p>
            <div class="button" @click="handleAddOrder">提交订单</div>
        </footer>
    </div>
</template>

<script>
import AddressAPI from '../../api/address'
import OrderAPI from '../../api/order'

export default {
    name:'pay-page',
    data(){
        return {
            address:null,
            cartRecords:[],
            totalPrice:0,
            message:'' //买家留言
        }
    },
    async onShow(){
        //获取收获地址
        const address = wx.getStorageSync('order_address')
        if(address){
            this.address = address
        }else{
            this.address = (await AddressAPI.getAll()).data[0]
        }
    },
    async beforeMount(){
        //获取购物车页面传递来的 购物车记录数据
        const data = wx.getStorageSync('order_cart_data')
        //console.log(data)
        this.totalPrice = data.totalPrice
        this.cartRecords = data.cartRecords
    },
    methods:{
        handleInputEvent(e){
            //处理买家留言
            this.message = e.mp.detail.value
        },
        handleOpenAddressAddPage(){
            //处理打开添加地址页面
            wx.navigateTo({
                url:'/pages/address_add/main',
                success(res){
                    //是否来自结算页面
                    wx.setStorageSync('open_from_pay_page',true)
                }
            })
        },
        handleOpenAddressManagerPage(){
            //处理打开管理地址页面
            const id = this.address.id
            wx.navigateTo({
                url:'/pages/address_manager/main',
                success(res){
                    //是否来自结算页面
                    wx.setStorageSync('open_from_pay_page',true)
                    wx.setStorageSync('pay_page_check_address_id',id)
                }
            })
        },
        async handleAddOrder(){
            //处理提交订单
            if(!this.address){
                wx.showToast({
                    title: '请选择收获地址',
                }) 
                return null
            }
            const cartRecordIds = this.cartRecords.map(ele=>ele.id)
            
            await OrderAPI.add(this.totalPrice,this.message,this.address.id,cartRecordIds)
            
            wx.navigateBack()
            //付款
        }
    }
}
</script>

<style lang="scss">
.pay-page{
    width: 100vw;
    min-height:100vh;
    background: $light-gray;
    padding:10px;

    .address{
        background: white;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;

        .info{
            flex-grow: 1;
            margin: 0 10px;

            .name{
                font-size: 18px;
                margin-right: 10px;
            }

            .phone{
                color: $gray;
            }

            p{
                &:first-child{
                    margin-bottom: 10px;
                }

                &:last-child{
                    color: $gray;
                }
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

    .features{
        width: 100%;

        .item{
            display: flex;
            padding: 10px;
            background: white;
            border-bottom: 1px solid $light-gray;

            .right{
                margin-left: 20px;
                flex-grow: 1;
                text-align: right;

                input{
                    text-align: left;
                }
            }
        }
    }

    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        left:0;
        background: white;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 20px;

        p{
            &:first-child{
                margin-right: 10px;
                span{
                    color: $color-1;
                }
            }
        }

        .button{
            padding: 10px 20px;
            background: $color-1;
            color: white;
        }
        
    }
}
</style>