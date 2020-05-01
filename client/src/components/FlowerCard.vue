<template>
    <div class="flower-card" @click="$emit('click')">
        <div class="image">
            <image lazy-load :src="flower.images[0]" mode="scaleToFill"></image>
        </div>
        <div class="info">
            <p class="title">{{ flower.name }}</p>
            <p><span class="price">￥{{flower.price}}</span><span class="peaple-count">{{ flower.sales }} 件已售</span></p>
        </div>
    </div>
</template>

<script>
export default {
    name:'flower-card',
    props:{
        flower:{
            type:Object,
            required: true
        }
    },
}
</script>

<style lang="scss">
.flower-card{
    background: white;
    display: flex;
    width: 100%;
    padding: 1rpx;
    border-bottom: 1rpx solid #e8e2e2;

    .image{
        flex-shrink: 0;
        width: 40%;
        height: 100px;
        padding-right: 10px;

        image{
            width: 100%;
            height: 100%;
        }
    }

    .info{
        width: 60%;
        flex-shrink: 0;
        .title{
            margin: 20px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .price{
            color: $color-1;
            margin-right: 15px;
        }
        .peaple-count{
            font-size: 12px;
            color: $gray;
        }
    }
}
</style>