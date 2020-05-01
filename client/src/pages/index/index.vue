<template>
  <div class="home-page">
    <!-- 首页 -->
    <header>
      <!-- 搜索框 -->
      <div class="search-box" @click="handleSearchBoxClick">
        <i-icon size="18" type="search" color="white" class="icon"/>
        <p>情人节</p>
      </div>

      <!-- 轮播图 -->
      <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="false"
        :circular="true"
        :interval="3000"
        indicator-color="#fae3d9"
        indicator-active-color="#ffb6b9"
      >
        <swiper-item v-for="(slide,index) in slides" :key="index">
            <image class="image" :src="slide.url" mode="scaleToFill"></image>
        </swiper-item>
      </swiper>
    </header>

    <div>
      <i-tabs :current="currentTab" color="#ffb6b9" @change="handleTabChange">
        <i-tab key="2" title="最新花材"></i-tab>
        <i-tab key="1" title="热门推荐"></i-tab>
        <i-tab key="3" title="特价促销"></i-tab>
      </i-tabs>

      <div>
        <FlowerCard @click="openProductDetailPage(product.id)" v-for="(product,index) in products" :key="index" :flower="product"/>
      </div>
    </div>


  </div>
</template>

<script>
import FlowerCard from '../../components/FlowerCard'
import ProductAPI from '../../api/product'
import SlideAPI from '../../api/slide'

export default {
  name:'home-page',
  components:{
    FlowerCard
  },
  data () {
    return {
      currentTab:2,
      slides:[],//轮播图
      hotProducts:[],
      latestProducts:[],
      cheapProducts:[] //促销
    }
  },
  computed:{
    products(){
      if(this.currentTab == 1){
        return this.hotProducts
      }else if(this.currentTab == 2){
        return this.latestProducts
      }else{
        return this.cheapProducts
      }
    }
  },
  async beforeCreate(){
    this.hotProducts = (await ProductAPI.getHot()).data
    this.latestProducts = (await ProductAPI.getLatest()).data
    this.cheapProducts = (await ProductAPI.getByCategory(1)).data
    this.slides = (await SlideAPI.getAll()).data

    //将促销分类中的产品列表保存起来
    this.$store.products = Array.from(new Set([...this.$store.products,...this.cheapProducts]))
  },
  methods:{
    //切换标签显示
    handleTabChange({mp}){
      this.currentTab = mp.detail.key
    },
    openProductDetailPage(productId){
      //打开商品详情页
      wx.navigateTo({
        url:'/pages/product_detail/main?id='+productId
      })
    },
    handleSearchBoxClick(){
      //处理搜索框点击
      wx.navigateTo({
        url:'/pages/search/main'
      })
    }
  }
}
</script>

<style lang="scss">
.home-page{
  height: 100vh;
  width: 100vw;
  padding: 0 20px;

  header{
    width: 100%;
    height: 37%;

    .search-box{
      background: $color-1;
      display: flex;
      align-items: center;
      padding:5px;
      border-radius: 15px;

      .icon{
        margin: 0 5px;
      }

      p{
        color: white;
      }
    }

    .swiper{
      height: 30vh;
      margin-top: 10px;

        .image{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
    }
  }
}
</style>
