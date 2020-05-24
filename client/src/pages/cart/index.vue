<template>
    <div class="shopping-cart-page">
        <!-- 购物车 -->
        <header>
            <span v-if="!idEditMode" @click="handleEditButtonClick">编辑</span>
            <span v-else @click="handleFinishEditButtonClick">完成</span>
        </header>
        <div class="content">
            <!-- 购物车的产品 -->
            <div class="products">

                <div class="nothing" v-if="cartRecords.length === 0">
                    <image src="/static/images/icon/empty.png"></image>
                    <p>购物车竟然空的</p>
                    <p>赶紧卖点宝贝犒劳下自己吧~</p>
                </div>

                <div class="product-card" v-for="(item,index) in cartRecords" :key="index">
                    <div class="radio-box">
                        <radio @click="handleProductCheckBtnClick(item.id)" :checked="item.isCheck" color="#ffb6b9"></radio>
                    </div>
                    <image class="image" :src="item.image"></image>
                    <div class="info">
                        <p class="title">{{ item.name }}</p>
                        <div>
                            <span class="price">￥{{ item.price }}</span>
                            <p class="amount">
                                <span @click="handleProductNumReduceOrAdd(item.id)" :class="{ disabled:item.num === 1 }">-</span>
                                <span>{{ item.num }}</span>
                                <span @click="handleProductNumReduceOrAdd(item.id,false)">+</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <i-divider class="divider" color="#ffb6b9" line-color="#ffb6b9">猜你喜欢</i-divider>
            <!-- 猜你喜欢 -->
            <div class="guess-like">
                <FlowerCard v-for="(flower,index) in recommendProducts" :key="index" :flower="flower"/>
            </div>
        </div>
        <footer>
            <div class="left">
                <radio :checked="isCheckAll" @click="handleCheckAllBtnClick" color="#ffb6b9">
                   全选
                </radio>
            </div>
            <div v-if="!idEditMode" class="right">
                <p>合计:<span>￥{{ totalPrice }}</span></p>
                <div class="button" @click="openPayPage">结算</div>
            </div>
            <div v-else class="right">
                <div class="button">删除</div>
            </div>
        </footer>
    </div>
</template>

<script>
import FlowerCard from '../../components/FlowerCard'
import CartRecord from '../../api/cart_record'
import Utils from '../../utils/utils'


export default {
    name:'shopping-cart-page',
    components:{
        FlowerCard
    },
    data(){
        return {
            recommendProducts:[],
            //productsMap:{},//购物车记录
            cartRecordsMap:{},//购物车记录
            idEditMode:false, // 是否是编辑模式
        }
    },
    computed:{
        cartRecords(){
            return Object.values(this.cartRecordsMap).reverse()
        },
        isCheckAll(){
            //是否全选
            const items = Object.values(this.cartRecordsMap)
            const checkItems =  items.filter(currentValue=>{
                return currentValue.isCheck === true
            })
            return items.length === checkItems.length
        },
        totalPrice(){
            //结算价格
            const total = Object.values(this.cartRecordsMap).reduce((total, record)=>{
                if(record.isCheck){
                    return total + record.price * record.num
                }else{
                    return total
                }
            },0)
            return total
        }
    },
    async onShow(){
        //猜你喜欢
        this.recommendProducts = this.$store.products.slice(0,Math.ceil(Math.random()*(this.$store.products.length-1)))

        //获取用户所有购物车记录
        const cartRecords = (await CartRecord.getAll()).data.map(ele=>{
            ele.isCheck = false
            return ele
        })

        this.cartRecordsMap = Utils.createMapFromObjectArray(cartRecords)
    },
    methods:{
        handleProductNumReduceOrAdd(id,reduce=true){
            //处理购物车记录内物品减少或者增加
            let record = this.cartRecordsMap[id]
            if(reduce){
                if(record.num!==1){
                    record.num = record.num-1
                }
            }else{
                record.num = record.num+1
            }
        },
        handleProductCheckBtnClick(id){
            //处理购物车记录内物品redio选择or不选择
            let record = this.cartRecordsMap[id]
            this.cartRecordsMap[id].isCheck = !record.isCheck
        },
        handleEditButtonClick(){
            //点击编辑按钮
            this.idEditMode = true
            //清空所有redio状态
            this.clearAllRedioStatus()
        },
        handleFinishEditButtonClick(){
            //点击完成编辑按钮
            this.idEditMode = false
            //清空所有redio状态
            this.clearAllRedioStatus()
        },
        handleCheckAllBtnClick(){
            //处理全选redio被点击
            if(this.isCheckAll){
                this.clearAllRedioStatus()
            }else{
                for (const key in this.cartRecordsMap) {
                    this.cartRecordsMap[key].isCheck = true
                }
            }
        },
        clearAllRedioStatus(){
           //清空所有redio状态 
           for (const key in this.cartRecordsMap) {
               this.cartRecordsMap[key].isCheck = false
           }
        },
        openPayPage(){
            //打开结算页面
            const results = [] //被选中的记录
            this.cartRecords.forEach(ele => {
                if(ele.isCheck){
                    results.push(ele)
                }
            })
            const data={
                cartRecords:results,
                totalPrice:this.totalPrice
            }

            //没有选择 就不打开结算页面
            if(results.length){
                wx.navigateTo({
                    url:'/pages/pay/main',
                    success(res){
                        //向结算页面传递 购物车记录 数据
                        wx.setStorageSync('order_cart_data',data)
                    }
                })
            }else{
                wx.showToast({
                    image:'/static/images/icon/error.png',
                    title: '至少选择一商品'
                })
            }
        }
    }
}
</script>

<style lang="scss">
.shopping-cart-page{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    header{
        text-align: right;
        padding:10px;
    }

    .content{
        width: 100%;
        flex-grow: 1;
        background: $light-gray;
        padding: 10px;

        .products{
            width: 100%;

            .product-card{
                width: 100%;
                background: white;
                display: flex;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;

                .radio-box{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image{
                    height: 100px;
                    width: 100px;
                    border-radius: 5px;
                    flex-shrink: 0;
                    margin-right: 5px;
                }

                .info{
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;

                    .title{
                        @include one-line-overflow;
                        flex-grow: 1;
                        padding-top:10px ;
                    }

                    div{
                        display: flex;
                        margin-bottom: 10px;

                        .price{
                            color: $color-1;
                        }

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
                }
            }

            .nothing{
                margin-bottom: 20px;

                image{
                    width: 50px;
                    height: 50px;
                }

                display: flex;
                flex-direction: column;
                align-items: center;
                color: $gray;

                p{
                    &:last-child{
                        font-size: 12px;
                    }
                }
            }
        }

        .guess-like{
            margin-bottom: 40px;
        }
    }

    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        padding: 5px 10px;
        background: white;

        .left{
            display: flex;
            align-items: center;
        }

        .right{
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            p{
                &:first-child{
                    margin-right: 10px;
                    span{
                        color: $color-1;
                    }
                }
            }

            .button{
                padding: 5px 20px;
                border-radius: 15px;
                background: $color-1;
                color: white;
            }
        }
    }
}
</style>