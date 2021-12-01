<template>
  <div class="wrapper" :style="{ 'height': height + 'px' }">
    <img src="../assets/211026_3fj58dlc2jdl8bf3i3j0k4djcj931_846x931.png" alt />
    <div class="detail">
      <p>男士羽绒服加长版</p>
      <div class="bottom">
        <span>￥228</span>
        <span>销量222</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Goods',
  props: {
    height: {
      type: Number,
      default: 300
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  margin-top: 15px;
  font-size: 14px;
  cursor: pointer;
  width: 200px;
  img {
    height: 70%;
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
  .detail {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    width: 100%;
    height: 30%;
    p{
      margin: 10px 0px 0 10px;
      display: inline-block;
    }
    .bottom {
      margin-left: 10px;
      margin-top: 30px;
      margin: 30px 10px 0px 10px ;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>