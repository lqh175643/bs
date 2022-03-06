<template>
  <div class="wrapper" :style="{ 'height': height + 'px' }" @click="goDetail">
    <img :src="goodsData.imgUrl" :data-id="goodsData.id" alt />
    <div class="detail">
      <TextHide :count="20" class="margin_top_10 text" :text="goodsData.detail" />
      <div class="bottom">
        <span>{{goodsData.price}}</span>
        <span>销量{{100}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import TextHide from "./TextHide.vue"
import { useRouter } from "vue-router";
export default {
  name: 'Goods',
  components:{
    TextHide
  },
  props: {
    height: {
      type: Number,
      default: 300
    },
    goodsData:{
      type:Object,
      default:()=>{
        return {
          imgUrl:'https://img12.360buyimg.com/n7/jfs/t1/205403/21/16178/317861/619b6b13E4f0f5bcd/a3ff899e58d8cf36.jpg',
          detail:'男士羽绒服加长版男士羽绒服加长版男士羽绒服加长版男士羽绒服加长版',
          price:'228',
          sale:'222'
        }
      }
    }
  },
  setup(props,cxt){
    const router = useRouter();
    const goDetail = ()=>{
      router.push({
        path: `/detail/${props.goodsData.category}/${props.goodsData.id}`,
      });
    }
    return {
      goDetail
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
    opacity: 1;
    height: 70%;
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
  .detail {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, .7);
    border-radius: 0 0 10px 10px;
    width: 100%;
    height: 30%;
    .margin_top_10{
      padding-top: 10px;
      padding: 10px 10px;
    }
    .text{
      height: 38px;
    }
    p{
      margin: 10px 0px 0 10px;
      display: inline-block;
    }
    .bottom {
      margin-left: 10px;
      margin-top: 30px;
      margin: 2px 10px 0px 10px ;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>