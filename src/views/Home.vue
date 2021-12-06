<template>
    <div class="middle">
        <div class="middle_left">
            <template v-for="item in 100">
                <Goods></Goods>
            </template>
        </div>
        <div class="middle_middle">
            <Swiper class="swiper"></Swiper>
            <Category class="category"></Category>
            <div class="middle_goods">
                <div class="item" v-for="item in 100">
                    <Goods></Goods>
                </div>
            </div>
        </div>
        <div class="middle_right">
            <template v-for="item in 100">
                <Goods></Goods>
            </template>
        </div>
    </div>
    <div class="setting-side" @click="drawer = !drawer">
        <el-tooltip content="设置主题" placement="top" effect="light">
            <i class="iconfont icon-shezhi"></i>
        </el-tooltip>
    </div>
    <el-drawer v-model="drawer" title="主题">
        <div class="drawer_body">
            <span class="font_color">文字主题颜色</span>
            <el-color-picker v-model="color" show-alpha @change="colorChange" />
            <p style="margin-top: 10px;" class="bg_theme">主题背景</p>
            <div class="bg_img" @click="bgChange">
                <img src="../assets/bg-1.jpg" alt />
                <img src="../assets/bg-2.jpg" alt />
                <img src="../assets/bg-3.jpg" alt />
                <img src="../assets/bg-3.jpg" alt />
            </div>
        </div>
    </el-drawer>
</template>
<script>
import Search from '../components/Search.vue'
import IconText from '../components/IconText.vue'
import Login from '../components/Login.vue'
import Swiper from '../components/Swiper.vue'
import Goods from '../components/Goods.vue'
import Category from '../components/Category.vue'

import { reactive, ref } from 'vue';

import { changeTheme } from '../utils'

export default {
    name: 'Home',
    components: {
        Search,
        IconText,
        Login,
        Swiper,
        Goods,
        Category
    },
    setup(props) {
        let drawer = ref(false)
        let color = ref('rgba(19, 206, 102, 0.8)')
        let bgChange = function (event) {
            console.log(event.target.src)
            document.body.style.background = `url(${event.target.src}) no-repeat top`
        }
        let colorChange = function () {
            changeTheme(color.value)
        }
        return {
            drawer,
            color,
            bgChange,
            colorChange
        }
    }
}
</script>
<style lang="scss" scoped>
.drawer_body {
    .font_color {
        margin-right: 30px;
        vertical-align: 20px;
    }
    .bg_img {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        img {
            margin-top: 20px;
            width: 40%;
        }
    }
}
.setting-side {
    cursor: pointer;
    i {
        font-size: 40px;
    }
    color: gray;
    transform: translateX(50%);
    transition-duration: 1000ms;
    position: fixed;
    right: 0px;
    top: 50%;
}
.setting-side:hover {
    transform: translateX(0);
    transition-duration: 1000ms;
    color: cadetblue;
}
.middle {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    .middle_left {
        width: 200px;
    }
    .middle_middle {
        margin: 0 50px;
        width: 600px;
        .category {
            margin-top: 20px;
        }
        .middle_goods {
            display: flex;
            flex-wrap: wrap;
            .item {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 50%;
            }
        }
    }
    .middle_right {
        width: 200px;
    }
}
:deep(.el-drawer) {
    height: 50% !important;
    transform: translateY(50%);
}
</style>