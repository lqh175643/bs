<template>
  <div class="wrapper">
    <div v-for="(item,index) in data" class="cate-item" :key="index" :data-myset="item.value" @click="getData">
      <img :src="item.src" alt />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import lingshi from '@/assets/lingshi.png'
import yifu from '@/assets/yifu.png'
import liwunan from '@/assets/liwunan.png'
import liwunv from '@/assets/liwunv.png'
import wenju from '@/assets/wenju.png'
import shuji from '@/assets/shuji.png'
import yundong from '@/assets/yundong.png'
import qita from '@/assets/1636710897364.jpg'

export default {
  name: 'Category',
  props: {
    data: {
      type: Object,
      // default:()=>{}
      default: () => {
        return [
          { title: '零食', src: lingshi, value: 'snacks' },
          { title: '衣服', src: yifu, value: 'clothes' },
          { title: '礼物男', src: liwunan, value: 'giftBoy' },
          { title: '礼物女', src: liwunv, value: 'giftGirl' },
          { title: '文具', src: wenju,value:'stationery' },
          { title: '书籍', src: shuji,value:'book' },
          { title: '运动', src: yundong,value:'sport' },
          { title: '零食', src: qita },
          { title: '零食', src: qita },
          { title: '零食', src: qita }
        ]
      }
    }
  },
  setup() {
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
    return {
      getData
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