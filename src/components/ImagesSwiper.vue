<template>
  <div class="wrapper">
    <div class="big_img">
      <img :src="getBigImg" alt />
    </div>
    <div class="left_swiper">
      <div>
        <i :class="['iconfont', 'icon-shangyiyehoutuifanhui', 'pre']" @click="preClick"></i>
      </div>
      <div class="img_swiper">
        <div class="img_swiper_wrapper" @mouseover="changeImg">
          <img
            v-for="(item,index) in images"
            :key="index"
            :src="item"
            :data-index="index"
            alt="展示图片"
            :class="['img_item', index == currentIndex ? 'active' : '']"
          />
        </div>
      </div>
      <div>
        <i :class="['iconfont', 'icon-xiayiyeqianjinchakangengduo', 'next']" @click="nextClick"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref, watch } from "vue"
export default {
  name: 'ImagesSwiper',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    let len = computed(() => {
      return props.images.length
    })
    let current = ref(0)
    watch(len, (newVal, oldVal) => {
      current.value = newVal >= 5 ? 5 : len.value
    })
    let img_item_wrapper = ref('')
    let currentIndex = ref(0)
    const preClick = function () {
      let temp = current.value - 5
      if (temp <= 0) return
      if (temp >= 4) {
        current.value -= 4
        img_item_wrapper.value.style.transform = `translateX(${-(current.value - 5) * 20}%)`
      } else {
        current.value -= temp
        img_item_wrapper.value.style.transform = `translateX(${-(current.value - 5) * 20}%)`
      }
    }
    const nextClick = function () {
      let temp = len.value - current.value
      if (temp <= 0) return
      if (temp >= 4) {
        current.value += 4
        img_item_wrapper.value.style.transform = `translateX(${-(current.value - 5) * 20}%)`
      } else {
        current.value += temp
        img_item_wrapper.value.style.transform = `translateX(${-(current.value - 5) * 20}%)`
      }
    }
    const changeImg = function (e) {
      if (e.target === e.currentTarget) return
      currentIndex.value = e.target.dataset.index
    }
    onMounted(() => {
      img_item_wrapper.value = document.getElementsByClassName('img_swiper_wrapper')[0]
    })
    const getBigImg = computed(() => {
      return props.images[currentIndex.value]?.replace('com/n5', 'com/n1')
    })
    return {
      preClick,
      nextClick,
      currentIndex,
      changeImg,
      getBigImg
    }
  }
}
</script>
<style lang="scss" scoped>
i {
  font-size: 40px;
  position: relative;
  top: 4px;
}
.pre {
  position: relative;
  right: 10px;
}
.next {
  position: relative;
  left: 10px;
}
.wrapper {
  width: 100%;
  .big_img {
    width: 100%;
    img {
      width: 100%;
      height: 412px;
    }
  }
  .left_swiper {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .img_swiper {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      .img_swiper_wrapper {
        width: 100%;
        transition-duration: 1s;
        .img_item {
          box-sizing: border-box;
          width: 18%;
          margin: 0 1%;
        }
      }
    }
  }
}
.active {
  border-style: solid;
  border-width: 2px;
  border-color: red;
}
</style>