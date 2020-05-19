<template>
    <div class="search-page">
        <!-- 搜索页面 -->

        <!-- 搜索框 -->
        <header>
            <div class="search-box">
                <i-icon type="search" size="18" color="#ffb6b9"/>
                <input  
                    type="text" 
                    confirm-type="search" 
                    placeholder="搜索商品" 
                    focus="true"
                    @confirm="handleSearchBoxConfirm"
                >
            </div>
            <span @click="handleCancelBtnClick">取消</span>
        </header>

        <!-- 搜索结果tab -->
        <div v-if="isFinishSearch">
            <i-tabs color="#ffb6b9" :current="currentTab" @change="handleTabChange">
                <i-tab key="1" title="综合"></i-tab>
                <i-tab key="2" title="销量"></i-tab>
                <i-tab key="3" title="价格"></i-tab>
            </i-tabs>
        </div>

        <div class="content">
            <!-- 搜索历史 -->
            <div class="search-history" v-if="!isFinishSearch">
                <p class="title">大家都在搜</p>
                <div class="hot-history">
                    <p>清明节</p>
                    <p>生日</p>
                    <p>百合</p>
                    <p>清明节</p>
                    <p>生日</p>
                    <p>百合</p>
                </div>
                <div class="title">
                    <p>搜索历史</p>
                    <p class="icon">
                        <i-icon type="trash" size="15"/>
                        <span>清空</span>
                    </p>
                </div>
                <div class="my-history">
                    <p>玫瑰</p>
                    <p>郁金香</p>
                    <p>粉色</p>
                </div>
            </div>

            <!-- 搜索结果 -->
            <div class="search-result" v-if="isFinishSearch">
                <FlowerCard v-for="(flower,index) in searchResults" :key="index" :flower="flower"/>
            </div>
        </div>
    </div>
</template>

<script>
import FlowerCard from '../../components/FlowerCard'

const searchResults = [
  {
    name:'D级玫瑰粉红雪山',
    price:12.9,
    sales:103,
    images:['https://ww3.sinaimg.cn/bmiddle/9ecef21dly1gdxp0hcz81j20u011h7fq.jpg']
  },
  {
    name:'梭尔邦多头粉百合',
    price:10.0,
    sales:78,
    images:['https://ww3.sinaimg.cn/bmiddle/69b7d63aly1gdz0a6oixgj20u016hk35.jpg']
  },
  {
    name:'西伯利亚三头百合',
    price:15.6,
    sales:15,
    images:['https://ww1.sinaimg.cn/bmiddle/75b16f03gy1gdz472lv9lj218g1qukjl.jpg']
  }
]

export default {
    name:'search-page',
    components:{
        FlowerCard
    },
    data(){
        return {
            searchResults,
            currentTab:1,
            isFinishSearch:false,//是否搜索结束 开始展示搜索结果
        }
    },
    onUnload(){
        this.isFinishSearch = false
    },
    methods:{
        handleTabChange({mp}){
            //切换标签显示
            this.currentTab = mp.detail.key
        },
        handleSearchBoxConfirm(){
            //处理搜索框点击确认
            this.isFinishSearch = true
        },
        handleCancelBtnClick(){
            //处理点击取消按钮
            //重置本页面的数据 

            wx.navigateBack()
        }
    }
}
</script>

<style lang="scss">
.search-page{
    width: 100vw;
    min-height: 100vh;
    background: $light-gray;

    header{
        background: white;
        padding: 10px 15px;
        display: flex;
        align-items: center;

        .search-box{
            // background: $light-gray;
            display: flex;
            padding: 5px 15px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            margin-right: 20px;
            flex-grow: 1;
            border: 1px solid $color-1;

            input{
                margin-left: 5px;
            }
        }
    }

    .content{
        padding: 10px 15px;

        .search-history{
            background: white;
            border-radius: 5px;
            padding: 10px;
            font-size: 15px;

            .title{
                display: flex;
                margin:10px 0;

                &:first-child{
                    margin-top: 0;
                }

                .icon{
                    flex-grow: 1;
                    text-align: right;
                    color: $gray;

                }
            }

            .hot-history,.my-history{
                display: flex;
                flex-wrap: wrap;

                p{
                    padding: 5px 10px;
                    border-radius: 15px;
                    margin-right: 10px;
                    background: $color-1;
                    margin-bottom: 5px;
                    color: white;
                }
            }
        }
    }
}
</style>