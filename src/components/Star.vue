<template>
  <div class="star_wrapper">
    <i
      v-for="item in 5"
      :key="item"
      :class="[
        'iconfont',
        'icon-aixin1',
        'star_icon',
        score >= item ? 'active_star' : 'inactive_star',
      ]"
      @mouseover="onmouseover(item)"
      @mouseout="onmouseout"
    ></i>
    <i class="star_des">{{star_map[score]}}</i>
  </div>
</template>
<script>
import { ref } from "vue";
import { starMap } from "../utils/constant"
export default {
  name: "Star",
  setup(props, ctx) {
    const score = ref(0);
    const onmouseover = (e)=>{
      score.value = e
      ctx.emit('changeStar',e)
    }
    const star_map = starMap
    return {
      score,
      onmouseover,
      star_map
    };
  },
};
</script>
<style lang="scss" scoped>
.star_icon {
  font-size: 50px;
}
.active_star {
  color: red;
}
.inactive_star {
  color: rgba(0,0,0,0.2);
}
.star_wrapper{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.star_des{
  font-size: 20px;
  margin-left: 30px;
  font-family: simsun;
}
</style>