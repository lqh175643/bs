<template>
  <div class="wrapper">
    <div class="price">
      <span class="margin_right_10">校园价</span>
      <div class="double_price">
        <div class="normal">{{ '￥' + price }}</div>
        <div class="plus">
          <span>{{ '￥' + Math.floor(price * 0.95).toFixed(2) }}</span>
          <span>PLUS会员专享价</span>
          <span>现在开通PLUS会员享限时特惠</span>
        </div>
      </div>
    </div>
    <div class="compus_bean">
      <span class="margin_right_10">校园豆</span>
      <div class="compus_bean_">1000豆可以抵10元</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Price',
  props: {
    price: {
      type: [Number,String],
      default: '100'
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: rgb(243, 243, 243);
  font-size: 20px;
  font-weight: bold;
  .price {
    font-size: 25px;
    color: #e4393c;
  }
}
</style>