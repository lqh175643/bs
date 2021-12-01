<template>
    <div class="main">
        <div class="wrapper">
            <i class="iconfont icon-denglu icon_bgc"></i>
        </div>
        <span>登录</span>
    </div>
</template>
<script>
export default {
    name: 'Login'
}
</script>
<style lang="scss" scoped>
.main {
    display: flex;
    align-items: center;
    .wrapper {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
        background-color: pink;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon_bgc {
            color: white;
        }
    }
}

span {
    font-size: 12px;
}
</style>