<template>
    <!-- 新增地址 -->
    <div class="address-add-page">
        <div class="item">
            <p class="right">收货人</p>
            <p class="left"><input @input="handleInuptEvent(1,$event)" :value="name" type="text" placeholder="收货人姓名"></p>
        </div>
        <div class="item">
            <p class="right">手机号码</p>
            <p class="left"><input @input="handleInuptEvent(2,$event)" :value="phoneNumber" type="text" placeholder="收货人手机号码"></p>
        </div>
        <div class="item">
            <p class="right">收货地址</p>
            <p class="left"><input @input="handleInuptEvent(3,$event)" :value="detail" type="text" placeholder="请填写收货地址"></p>
        </div>

        <div class="button" @click="handleSave">
            保存
        </div>
        
    </div>
</template>

<script>
import AddressAPI from '../../api/address'

export default {
    name:'address-add-page',
    data(){
        return {
            name:'',
            phoneNumber:'',
            detail:''
        }
    },
    methods:{
        handleInuptEvent(type,event){
            //处理input 的 input事件
            const value = event.mp.detail.value
            if(type === 1){
                this.name = value
            }else if(type === 2){
                this.phoneNumber = value
            }else{
                this.detail = value
            }
        },
        async handleSave(){
            //保存
            const address = (await AddressAPI.add(this.name,this.phoneNumber,this.detail)).data

            //如果来自结算页面打开
            if(wx.getStorageSync('open_from_pay_page')){
                wx.setStorageSync('order_address',address)
                
                wx.setStorageSync('open_from_pay_page',false)
            }

            wx.navigateBack()
        }
    }
}
</script>

<style lang="scss">
.address-add-page{
    width: 100vw;
    min-height: 100vh;
    background: $light-gray;

    .item{
        width: 100%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid $light-gray;
        background: white;

        .right{
            width: 22%;
        }

        .left{
            width: 75%;
        }
    }

    .button{
        padding: 10px 0;
        margin: 20px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $color-1;
        color: white;
        border-radius: 5px;
    }
}
</style>