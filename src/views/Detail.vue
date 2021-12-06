<template>
  <div class="detail_wrapper">
    <div class="left_swiper">
      <ImagesSwiper :images="detailData.images" />
    </div>
    <div class="middle"></div>
    <div class="right_detail">
      <!-- <div class="detail_text">
        <span class></span>
        {{ detailData.productDescription }}
      </div>
      <div class="detail_price">
        <Price :price="detailData.price" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { onBeforeMount, reactive ,ref} from 'vue'
import { getDetail } from '../api/detail'

import ImagesSwiper from '../components/ImagesSwiper.vue'
import Price from '../components/Price.vue'
export default {
  name: 'Detail',
  components: {
    ImagesSwiper,
    Price
  },
  setup(props) {
    const route = useRouter()
    let id = route.currentRoute.value.params.id
    let category = route.currentRoute.value.params.category
    let detailData = ref({})
    const options = { id, category }
    onBeforeMount(() => {
      getDetail(options).then(res => {
        detailData.value = res
      })
    })
    return {
      detailData
    }
  }
}
</script>
<style lang="scss">
.detail_wrapper {
  margin-top: 30px;
  display: flex;
  .left_swiper {
    flex: 8;
  }
  .middle{
    flex: 1;
  }
  .right_detail {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
    flex: 10;
    .detail_price {
      margin-top: 20px;
    }
  }
}
</style>