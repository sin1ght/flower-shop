<template>
    <div class="category-page">
        <!-- 全部分类页面 -->
        <div class="categorys">
           <!-- 那些类别 -->
           <div 
            class="category-item" 
            :class="{ 'active-item': category.id === currentCategoryId }" 
            v-for="(category,index) in categorys" 
            :key="index"
            @click="handleCategoryItemClick(category.id)"
           >
              {{ category.name }}
           </div>
        </div>
        <div class="category-content">
            <!-- 所属分类花 -->
            <FlowerCard @click="openProductDetailPage(product.id)" v-for="(product,index) in products" :key="index" :flower="product"/>
        </div>
    </div>
</template>

<script>
import FlowerCard from '../../components/FlowerCard'
import CategoryAPI from '../../api/category'
import ProductAPI from '../../api/product'


export default {
    name:'category-page',
    components:{
        FlowerCard
    },
    data(){
        return {
            categorys:[],
            currentCategoryId:1,
            allProducts:[]//所有分类的产品
        }
    },
    computed:{
        products(){
            return this.allProducts.filter(ele=>{
                return ele.categoryId === this.currentCategoryId
            })
        }
    },
    async beforeMount(){
        this.allProducts = this.$store.products

        this.categorys = (await CategoryAPI.getAll()).data
    },
    methods:{
        async handleCategoryItemClick(categoryId){
            //处理分类切换
            this.currentCategoryId = categoryId
            
            let products = this.allProducts.filter(ele=>{
                return ele.categoryId === categoryId
            })
            if(!products.length){
                //store里面没有当前分类的产品
                products = (await ProductAPI.getByCategory(categoryId)).data

                this.$store.products = Array.from(new Set([
                    ...this.$store.products,
                    ...products
                ]))

                this.allProducts = this.$store.products
            }
        },
        openProductDetailPage(productId){
            //打开商品详情页
            wx.navigateTo({
                url:'/pages/product_detail/main?id='+productId
            })
        },
    }
}
</script>

<style lang="scss">
.category-page{
    height: 100vh;
    width: 100vw;
    display: flex;

    .categorys{
        width: 30%;
        background: $light-gray;

        .category-item{
            color: $gray;
            padding: 10px 0;
            text-align: center;
        }

        .active-item{
            color: $color-1;
            background: white;
        }
    }

    .category-content{
        width: 70%;
    }

}
</style>