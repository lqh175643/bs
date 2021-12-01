<template>
  <div class="wrapper">
    <div v-for="item in data" class="cate-item" :data-myset="item.value" @click="getData">
      <img :src="item.src" alt />
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
          { title: '零食', src: 'src/assets/1636710897364.jpg', value: 'snacks' },
          { title: '衣服', src: 'src/assets/1636710897364.jpg', value: 'clothes' },
          { title: '礼物男', src: 'src/assets/1636710897364.jpg', value: 'giftBoy' },
          { title: '礼物女', src: 'src/assets/1636710897364.jpg', value: 'giftGirl' },
          { title: '文具', src: 'src/assets/1636710897364.jpg',value:'stationery' },
          { title: '零食', src: 'src/assets/1636710897364.jpg' },
          { title: '零食', src: 'src/assets/1636710897364.jpg' },
          { title: '零食', src: 'src/assets/1636710897364.jpg' },
          { title: '零食', src: 'src/assets/1636710897364.jpg' },
          { title: '零食', src: 'src/assets/1636710897364.jpg' }
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
      console.log(useRouter)
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
  background-color: #fff;
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
    }
    p {
      margin-top: 5px;
    }
  }
}
</style>