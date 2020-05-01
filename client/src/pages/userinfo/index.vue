<template>
    <!-- 用户个人信息 -->
    <div class="userinfo-page">
        <div class="item">
            <p class="right">姓名</p>
            <p class="left"><input type="text" placeholder="请输入您的姓名"></p>
        </div>
        <div class="item">
            <p class="right">手机号码</p>
            <p class="left"><input type="text" placeholder="请输入您的手机号码"></p>
        </div>

        <div class="button">
            确认修改
        </div>
    </div>
</template>

<script>
export default {
    name:'userinfo-page',
    
}
</script>

<style lang="scss">
.userinfo-page{
    width: 100vw;
    height: 100vh;
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