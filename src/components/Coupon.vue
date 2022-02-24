<template>
  <div :class="['coupon_wrapper', isActive ? 'active' : '', isDisabled?'disabled':'']">
    <div class="coupon_header">
      <div class="top">
        <strong>￥{{ coupon.reduce }}</strong>
        <span> 满{{ coupon.price }}</span>
        <div>有效期至{{ coupon.time || "2023-2-20" }}</div>
      </div>
    </div>
    <div class="coupon_footer">
      {{ coupon.limit }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Coupon",
  props: {
    coupon: {
      type: Object,
      default: () => {},
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    return {};
  },
};
</script>
<style lang="scss">
.active {
  border: 2px deeppink solid !important;
}
.disabled {
  cursor:no-drop !important;
  opacity: 0.6;
}
.coupon_wrapper {
  cursor: pointer;
  border-radius: 8px;
  border: 1px grey solid;
  overflow: hidden;
  width: 150px;
  height: 95px;
  .coupon_header {
    height: 70px;
    background-color: #74d2d4;
    .top {
      strong {
        font-size: 20px;
      }
      div {
        margin-top: 20px;
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }
  .coupon_footer {
    height: 25px;
    background-color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>