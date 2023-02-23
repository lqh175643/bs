<template>
  <div class="wrapper">
    <div v-for="(item,index) in data" class="cate-item" :key="index" :data-myset="item.value" @click="getData">
      <img :src="getImageUrl(item.src)" alt />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Category',
  props: {
    data: {
      type: Object,
      // default:()=>{}
      default: () => {
        return [
          { title: '零食', src: '../assets/lingshi.png', value: 'snacks' },
          { title: '衣服', src: '../assets/yifu.png', value: 'clothes' },
          { title: '礼物男', src: '../assets/liwunan.png', value: 'giftBoy' },
          { title: '礼物女', src: '../assets/liwunv.png', value: 'giftGirl' },
          { title: '文具', src: '../assets/wenju.png',value:'stationery' },
          { title: '书籍', src: '../assets/shuji.png',value:'book' },
          { title: '运动', src: '../assets/yundong.png',value:'sport' },
          { title: '零食', src: '../assets/1636710897364.jpg' },
          { title: '零食', src: '../assets/1636710897364.jpg' },
          { title: '零食', src: '../assets/1636710897364.jpg' }
        ]
      }
    }
  },
  setup(props) {
    let route = useRouter()
    let getData = function (e) {
      let url = e.currentTarget.getAttribute('data-myset')
      route.push({
        path: `/Category/${url}`,
        query: {
          page: 1,
          limit: 30
        }
      })
    }
    const getImageUrl = (name) => {
      return new URL(`${name}`, import.meta.url).href
    }
    return {
      getData,
    getImageUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  background-color: $mybgc8;
  border-radius: 5%;
  width: 600px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .cate-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    img {
      width: 70px;
      height: 90px;
      border-radius: 5px;
    }
    p {
      margin-top: 5px;
    }
  }
}
</style>