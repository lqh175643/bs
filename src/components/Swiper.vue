<template>
    <el-carousel :height="height" :style="{ 'width': width + 'px','borderRadius':'5%' }">
        <el-carousel-item v-for="item in swiperData" :key="item.src">
            <img :src="item.src" alt="">
        </el-carousel-item>
    </el-carousel>
</template>
<script lang="ts">
import { reactive, onBeforeMount } from 'vue'
import firstImg from '@/assets/1636710897364.jpg'
import secondImg from '@/assets/1637053429093.jpg'
export default {
    name: 'Swiper',
    props: {
        width: {
            type: Number,
            default: 600
        },
        height: {
            type: String,
            default: "300"
        },
        getSwiperData: {
            type: Function,
            default: () => { }
        },
        swiperDataParams: {
            type: Object,
            default: () => { }
        }
    },
    setup(props) {
        let swiperData = reactive([{
            src:firstImg
        },{
            src:secondImg
        }])
        // onBeforeMount(() => {
        //     let params = props.swiperDataParams
        //     props.getSwiperData(params).then(res => {
        //         swiperData = reactive({
        //             ...res.data
        //         })
        //     })
        // })
        return {
            swiperData
        }
    }
}
</script>
<style lang="scss">
    
</style>