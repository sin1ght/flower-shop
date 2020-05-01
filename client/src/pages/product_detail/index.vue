<template>
    <div class="product-detail-page">
        <!-- 商品详情页 -->
        <!-- 轮播图 -->
        <header>
            <swiper 
                class="swiper"
                circular="true"
                :current="currentImageIndex"
                @change="handleSwiperChange"
            >
                <swiper-item v-for="(img,index) in product.images" :key="index">
                    <image class="image" :src="img" mode="scaleToFill" lazy-load="true"></image>
                </swiper-item>
            </swiper>
            <!-- 右下角指示器 -->
            <div class="indicator">
                {{ currentImageIndex+1 }}/{{ product.images.length }}
            </div>
        </header>

        <!-- 标题价格等信息 -->
        <div class="info1">
            <div class="price">${{product.price}}</div>
            <div class="title">
                <p>{{product.name}}</p>
                <p><i-icon type="share" />分享</p>
            </div>
        </div>
        <div class="info2">
            <span>已售 {{product.sales}}</span>
            <span>剩余 {{product.amount}}</span>
        </div>

        <!-- 选择数量 -->
        <div class="info3">
            <div class="title">选择数量</div>
            <div class="amount">
                <span @click="handleProductNumReduceOrAdd" :class="{ disabled:num === 1 }">-</span>
                <span>{{ num }}</span>
                <span @click="handleProductNumReduceOrAdd(false)">+</span>
            </div>
        </div>

        <!-- 商品详情和评论 -->
        <div class="info4">
            <i-tabs :current="currentTab" color="#ffb6b9" @change="handleTabChange">
                <i-tab key="1" title="商品详情"></i-tab>
                <i-tab key="2 " title="评论"></i-tab>
            </i-tabs>

            <!-- 商品详情 -->
            <div class="product-detail" v-if="currentTab == 1">
                {{product.desc}}
            </div>

            <!-- 评论 -->
            <div class="comment" v-if="currentTab == 2">
                <div class="comment-card">
                    <div class="head">
                        <image class="avatar" src="/static/images/avatar.jpg"></image>
                        <div class="info">
                            <div>
                                <p class="nickname">可乐</p>
                                <p class="star">
                                    <i-icon size="18" color="#ffb6b9" type="like_fill" />
                                    <i-icon size="18" color="#ffb6b9" type="like_fill" />
                                </p>
                            </div>
                            <p class="time">2020/4/8 21:28</p>
                        </div>
                    </div>
                    <div class="content">
                        宝贝很棒，很喜欢，店家人很好！
                    </div>
                </div>
                <div class="comment-card">
                    <div class="head">
                        <image class="avatar" src="/static/images/logo.png"></image>
                        <div class="info">
                            <div>
                                <p class="nickname">蜂蜜柚子薯片</p>
                                <p class="star">
                                    <i-icon size="18" color="#ffb6b9" type="like_fill" />
                                    <i-icon size="18" color="#ffb6b9" type="like_fill" />
                                    <i-icon size="18" color="#ffb6b9" type="like_fill" />
                                </p>
                            </div>
                            <p class="time">2020/4/8 10:28</p>
                        </div>
                    </div>
                    <div class="content">
                        宝贝很棒，很喜欢，店家人很好！
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部按钮 -->
        <footer>
            <div @click="handleAddCartRecord">加入购物车</div>
            <div>立即购买</div>
        </footer>
    </div>
</template>

<script>
import Utils from '../../utils/utils'
import ProductAPI from '../../api/product'
import CartRecordAPI from '../../api/cart_record'

export default {
    name:'product-detail-page',
    data(){
        return {
            num:1,//购买数量
            currentTab:1,
            currentImageIndex:0,//轮播图image
            product:{
                images:[]
            }
        }
    },
    //返回上一个页面的时候 恢复初始设置
    onUnload(){
        this.num = 1
        this.currentImageIndex=0
        this.currentTab = 1
    },
    async beforeMount(){
        const productId = this.$mp.query.id
        const productsMap = Utils.createMapFromObjectArray(this.$store.products)

        if(productsMap[productId]){
            //store中存在
            this.product = productsMap[productId]
        }else{
            //store中不存在
            const res = await ProductAPI.getById(productId)
            const product = res.data
            this.product = product

            this.$store.products.push(this.product)
        }
    },
    methods:{
        handleSwiperChange(e){
            //处理轮播图滑动事件
            this.currentImageIndex = e.mp.detail.current
        },
        handleTabChange(e){
            //处理tab变化
            this.currentTab = e.mp.detail.key
        },
        handleProductNumReduceOrAdd(reduce=true){
            //处理物品减少或者增加
            if(reduce){
                if(this.num!==1){
                    this.num = this.num-1
                }
            }else{
                this.num = this.num+1
            }
        },
        handleAddCartRecord(){
            //加入购物车
            CartRecordAPI.add(
                this.num,
                this.product.id
            )
            wx.showToast({
                title: '添加成功~'
            })
        }
    }
}
</script>

<style lang="scss">
.product-detail-page{
    background: $light-gray;
    width: 100vw;
    min-height: 100vh;

    header{
        height:45vh;
        position: relative;

        .swiper{
            height: 100%;
            width: 100%;

            .image{
                width: 100%;
                height: 100%;
            }
        }

        .indicator{
            background:#4e393a70;
            position: absolute;
            right: 10px;
            bottom: 10px;
            padding: 5px 10px;
            color: white;
            border-radius: 15px;

        }
    }

    .info1{
        padding: 10px;
        background: white;

        .price{
            color: $color-1;
            font-size: 20px;
            font-weight: bold;
        }

        .title{
            display: flex;

            p{
                &:first-child{
                    flex-grow: 1;
                }
                &:last-child{
                    color: $gray;
                    font-size: 12px;
                    background: $light-gray;
                    padding: 5px 10px;
                    border-radius: 20px;
                }
            }
        }
    }

    .info2{
        margin: 10px 0;
        background: white;
        padding: 10px;
        color: $gray;
        text-align: right;
        font-size: 14px;

        span{
            &:first-child{
                border-right: 2px solid $light-gray;
                padding-right: 10px;
                margin-right: 10px ;
            }
        }
    }

    .info3{
        margin: 10px 0;
        background: white;
        padding: 10px;
        color: $gray;
        display: flex;

        .amount{
            flex-grow: 1;
            text-align: right;

            span{
                padding: 5px 10px;
                margin-right: 5px;
                background: $color-1;
                color: white;

                &:first-child{
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                &:last-child{
                    margin-right: 0;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
            }

            .disabled{
                background: $light-gray;
                color: black;
            }
        }
    }

    .info4{
        .product-detail{
            color: $gray;
            padding: 10px;
            background: white;
            margin-bottom: 50px;
        }

        .comment{
            padding: 10px;
            color: $gray;
            background: white;
            margin-bottom: 50px;

            .comment-card{
                padding-bottom:5px;
                margin-bottom: 5px;
                border-bottom: 1px solid $light-gray;

                .head{
                    display: flex;
                    margin-bottom: 10px;
                    align-items: center;

                    .avatar{
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin-right: 5px;
                    }

                    .info{
                        >div{
                            display: flex;
                            align-items: center;
                            margin-bottom: 5px;

                            .nickname{
                                color: black;
                                margin-right: 10px;
                            }
                        }

                        .time{
                            font-size: 10px;
                        }
                    }
                }
            }
        }
    }

    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: white;
        display: flex;
        justify-content: flex-end;
        padding: 5px;

        div{
            color: white;
            padding: 10px 20px;

            &:first-child{
                background: $color-2;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
            }
            &:last-child{
                background: $color-1;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
            }
        }
    }
}
</style>