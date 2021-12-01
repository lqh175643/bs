<template>
    <div class="main">
        <i :class="['iconfont',icon]"></i>
        <span>{{text}}</span>
    </div>
</template>
<script>
export default {
    name:'IconText',
    props:{
        icon:'',
        text:''
    },
}
</script>
<style lang="scss" scoped>
.main{
    display: flex;
    flex-direction: column;
    font-size: 12px;
}
</style>