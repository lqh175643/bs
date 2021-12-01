<template>
    <el-input placeholder="零食大礼包" :style="{width:width+'px'}">
        <template #append>
            <i class="iconfont icon-search"></i>
        </template>
    </el-input>
</template>
<script>
export default {
    name: 'Search',
    props:{
        width:{
            type:Number,
            default:400
        }
    }
}   
</script>