<template>
  <div class="main">
    <i :class="['iconfont', icon]"></i>
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  name: 'IconText',
  props: {
    icon: '',
    text: ''
  },
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background-color: $mybgc6;
  padding: 4px;
  border-radius: 8px;
  // box-sizing: content-box;
  cursor: pointer;
  i {
    font-size: 25px;
    text-align: center;
  }
  .span {
    text-align: center;
  }
}
</style>