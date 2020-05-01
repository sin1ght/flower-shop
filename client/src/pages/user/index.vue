<template>
    <div class="user-page">
        <!-- 用户个人中心 -->
        <header>
            <div class="info">
                <image class="image" :src="avatarUrl"></image>
                <p class="msg"> {{ nickName }}</p>
            </div>
        </header>

        <div class="content">
            <!-- 订单管理 -->
            <div class="order" @click="openPage('/pages/order_manager/main')">
                <div class="head">
                    <p>我的订单</p>
                    <p class="two">全部订单 ></p>
                </div>
                <div class="foot">
                    <div>
                        <i-icon size="28" color="#ffb6b9" type="financial_fill" />
                        <p>待付款</p>
                    </div>
                    <div>
                        <i-icon size="28" color="#ffb6b9" type="barrage_fill" />
                        <p>待发货</p>
                    </div>
                    <div>
                        <i-icon size="28" color="#ffb6b9" type="task_fill" />
                        <p>待收货</p>
                    </div>
                    <div>
                        <i-icon size="28" color="#ffb6b9" type="message_fill" />
                        <p>评价</p>
                    </div>
                </div>
            </div>

            <!-- 其他功能 -->
            <div class="feature">
                <div>
                    <image class="image" src="/static/images/icon/cart-a.png"></image>
                    <p>购物车</p>
                </div>
                <div @click="openPage('/pages/address_manager/main')">
                    <image class="image" src="/static/images/icon/address-a.png"></image>
                    <p>收获地址</p>
                </div>
                <div @click="openPage('/pages/userinfo/main')">
                    <image class="image" src="/static/images/icon/user-a.png"></image>
                    <p>个人信息</p>
                </div>
                <div>
                    <image class="image" src="/static/images/icon/history-a.png"></image>
                    <p>历史足迹</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'user-page',
    data(){
        return {
            
        }
    },
    computed:{
        avatarUrl(){
            return this.$store.user.avatarUrl
        },
        nickName(){
            return this.$store.user.nickName
        }
    },
    methods:{
        openPage(url){
            //打开其他页面
            wx.navigateTo({
                url
            })    
        }
    }
}
</script>

<style lang="scss">
.user-page{
    background: $light-gray;
    height: 100vh;
    width: 100vw;

    header{
        background: $color-1;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;

        .info{
            text-align: center;

            .image{
                height: 80px;
                width: 80px;
                border-radius: 40px;
                background: white;
            }

            .msg{
                color: white;
            }
        }
    }

    .content{
        height: 70%;
        padding: 20px;

        .order{
            width: 100%;
            padding: 20px;
            background: white;
            border-radius: 10px;

            .head{
                width: 100%;
                padding-bottom: 20px;
                text-align: right;
                border-bottom: 1px solid $light-gray;

                p:nth-child(1){
                    float: left;
                }

                .two{
                    font-size: 12px;
                    color:$gray;
                }
            }

            .foot{
                padding-top: 20px;
                width: 100%;
                display: flex;
                justify-content: space-around;

                div{
                    text-align: center;
                }
            }
        }

        .feature{
            margin-top: 20px;
            width: 100%;
            padding:10px 20px;
            background: white;
            border-radius: 10px;

            div{
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid $light-gray;
                align-items: center;

                &:last-child{
                    padding-bottom: 0;
                    border-bottom:none;
                }

                &:first-child{
                    padding-top: 0;
                }

                .image{
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>