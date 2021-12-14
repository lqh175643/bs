<template>
  <div class="wrapper">
    <div class="price">
      <span class="margin_right_10">校园价</span>
      <span class="normal_price">{{ '￥' + price }}</span>
      <div class="plus">
        <span class="plus_price">{{ '￥' + Math.floor(price * 0.95).toFixed(2) }}</span>
        <span class="plus_detail">PLUS会员专享价</span>
        <span class="plus_go">现在开通PLUS会员享限时特惠</span>
      </div>
    </div>
    <div class="compus_bean">
      <span class="margin_right_10">校园豆</span>
      <span class="compus_bean_">1000豆可以抵10元</span>
    </div>
    <div class="common_count">
      <div class="common_count_text">累计评价</div>
      <div class="common_count_bom">10+</div>
    </div>
    <div class="promotion">
      <span class="margin_right_10">促&nbsp销</span>
      <span class="promotion_text">
        <span class="promotion_logo">多买优惠</span>
        <div class="next_line">满2件,总价打9.50折;满3件,总价打9.0折</div>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Price',
  props: {
    price: {
      type: [Number, String],
      default: '100'
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  font-family: simsun;
  background-color: rgb(243, 243, 243);
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  .margin_right_10 {
    margin-right: 10px;
  }
  .normal_price {
    font-size: 22px;
    color: #e4393c;
  }
  .plus {
    .plus_price {
      margin-left: 62px;
      color: #333;
    }
    .plus_detail {
      font-size: 14px;
      margin-left: 5px;
      font-weight: 400;
    }
    .plus_go {
      margin-left: 5px;
      font-size: 14px;
      color: #005aa0;
    }
  }
  .compus_bean {
    margin-top: 12px;
    .compus_bean_ {
      font-size: 16px;
    }
  }
  .common_count {
    position: absolute;
    left: 444px;
    top: 16px;
    .common_count_text {
      font-size: 14px;
    }
    .common_count_bom {
      position: relative;
      left: 10px;
      font: 16px verdana;
    }
  }
  .promotion {
    font-size: 16px;
    margin-top: 12px;
    .promotion_text {
      .promotion_logo {
        font-size: 12px;
        color: red;
        padding: 2px;
        border: 1px red solid;
      }
      .next_line {
        margin-left: 56px;
        font-size: 12px;
        margin-top: 12px;
      }
    }
  }
}
</style>