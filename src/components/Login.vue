<template>
  <div class="main" @click="loginClick">
    <div class="wrapper">
      <i class="iconfont icon-denglu icon_bgc"></i>
    </div>
    <span>登录</span>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup(props) {
    let router = useRouter()
    console.log(router)
    let loginClick = function(){
      router.push({
        path:'/login'
      })
    }
    return {
      loginClick
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  cursor: pointer;
  display: flex;
  align-items: center;
  .wrapper {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon_bgc {
      color: white;
    }
  }
}

span {
  font-size: 12px;
}
</style>