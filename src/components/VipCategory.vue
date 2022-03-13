<template>
  <div :class="['vip_wrapper',isActive?'vip_wrapper_active':'']">
    <div class="time">
      {{time}}个月
    </div>
    <div class="price">
      ￥{{price}}
    </div>
  </div>
</template>
<script>
export default {
  name:'VipCategory',
  props:{
    time:{
      type:Number,
      default:1
    },
    price:{
      type:Number,
      default:10,
    },
    isActive:{
      type:Boolean,
      default:true
    }
  },
  setup(props){
    return{

    }
  }
}
</script>
<style lang="scss" scoped>
  .vip_wrapper{
    display: inline-block;
    margin: 10px;
    width: 80px;
    height: 100px;
    border: 1px #999 solid;
    border-radius: 10px;
    background-color: rgba(0,0,0,0.1);
    .time{
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      font-weight: 600;
    }
    .price{
      text-align: center;
      font-size: 18px;
      line-height: 50px;
      font-weight: 600;
    }
  }
  .vip_wrapper_active{
    background-color: rgb(255,153,0);
  }
</style>