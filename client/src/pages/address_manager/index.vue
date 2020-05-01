<template>
    <div class="address-manager-page">

        <!-- 地址列表 -->
        <div class="addresses" v-if="!isFromPayPage">
            <div class="item" v-for="(address,index) in addressList" :key="index">
                <div class="info">
                    <p>
                        <span class="name">{{address.name}}</span>
                        <span>{{address.phoneNumber}}</span>
                    </p>
                    <p>
                        收获地址: {{address.detail}}
                    </p>
                </div>
                <i-icon type="brush_fill" color="#ffb6b9" size="20"/>
            </div>
        </div>
        <div class="addresses" v-else>
            <radio-group @change="handleRadioGroupChange">
                <div class="item" v-for="(address,index) in addressList" :key="index">
                    <div class="radio-box">
                        <radio color="#ffb6b9" :checked="address.id === checkId" :value="address.id"></radio>
                    </div>
                    <div class="info">
                        <p>
                            <span class="name">{{address.name}}</span>
                            <span>{{address.phoneNumber}}</span>
                        </p>
                        <p>
                            收获地址: {{address.detail}}
                        </p>
                    </div>
                    <i-icon type="brush_fill" color="#ffb6b9" size="20"/>
                </div>
            </radio-group>
        </div>
        
        <footer @click="openAddressAddPage">
            <i-icon type="add" color="white"/>
            新增收获地址
        </footer>
    </div>
</template>

<script>
import AddressAPI from '../../api/address'
import Utils from '../../utils/utils'

export default {
    name:'address-manager-page',
    data(){
        return {
            addressList:[],
            isFromPayPage:false,//是否来自结算页面
            checkId:0,
        }
    },
    async onShow(){
        this.addressList = (await AddressAPI.getAll()).data

        const isFromPayPage = wx.getStorageSync('open_from_pay_page')
        if(isFromPayPage){
            this.isFromPayPage = true
            this.checkId = wx.getStorageSync('pay_page_check_address_id')
        }else{
            this.isFromPayPage = false
        }
    },
    onUnload(){
        console.log('onUnload')
        //如果来自结算页面打开
        if(this.isFromPayPage){
            wx.setStorageSync('open_from_pay_page',false)
        }
    },
    methods:{
        openAddressAddPage(){
            //打开新增地址页面
            wx.navigateTo({
                url:'/pages/address_add/main'
            })
        },
        handleRadioGroupChange(e){
            //处理radio group
            const id = e.mp.detail.value
            const addressMap = Utils.createMapFromObjectArray(this.addressList)

            const address = addressMap[id]
            wx.setStorageSync('order_address',address)

            wx.navigateBack()
        }
    }
}
</script>

<style lang="scss">
.address-manager-page{
    width: 100vw;
    min-height: 100vh;
    background: $light-gray;

    .addresses{
        .item{
            padding: 10px 20px;
            display: flex;
            background: white;
            align-items: center;
            border-bottom:1px solid  $light-gray;

            .info{
                flex-grow: 1;

                .name{
                    margin-right: 10px;
                }

                p{
                    &:last-child{
                        color: $gray;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                }
            }
        }
    }

    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background: $color-1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        color: white;
    }
}
</style>