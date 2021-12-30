<template>
  <div class="wrapper">
    <div class="head_pic">
      <div class="head_pic_wrapper">
        <img v-if="commentData?.isAnonymous" src alt />
        <i v-else :class="['iconfont', 'icon-anonymous']"></i>
      </div>
      <div v-if="!commentData?.isVip" class="head_vip">
        <span>超级会员</span>
      </div>
    </div>
    <div class="content">{{commentData.content || commentData}}</div>
  </div>
</template>
<script>
export default {
  name: 'Commit',
  props: {
    commentData: {
      type: [Object, String],
      default: () => { }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin-bottom: 30px;
  color: #333;
  .head_pic {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .head_pic_wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 30px;
        width: 30px;
      }
      i {
        color: gray;
        font-size: 30px;
      }
    }
    .head_vip {
      margin-top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: yellow;
      width: 60px;
      height: 18px;
      font-size: 12px;
      background-color: #414141;
    }
  }
  .content {
    flex: 5;
  }
}
</style>