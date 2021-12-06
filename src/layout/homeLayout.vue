<template>
  <div class="top_bar">
    <div class="top_bar_head">
      <template v-for="item in home_btn">
        <IconText :text="item.text" :icon="item.icon" class="tab_bar_icon"></IconText>
      </template>
    </div>
    <Search class="search"></Search>
    <template v-for="item in tabbar_icon_text">
      <IconText :text="item.text" :icon="item.icon" class="tab_bar_icon"></IconText>
    </template>
    <Login class="login"></Login>
  </div>
  <div class="router_view_wrapper">
    <div class="router_view">
      <router-view />
    </div>
  </div>
</template>
<script>
import Search from '../components/Search.vue'
import IconText from '../components/IconText.vue'
import Login from '../components/Login.vue'
export default {
  name: 'homeLayout',
  components: {
    Search,
    IconText,
    Login,
  },
  setup(props) {
    let tabbar_icon_text = [{ text: '消息', icon: 'icon-31daipingjia' }, { text: '收藏', icon: 'icon-shoucang' }, { text: '购物车', icon: 'icon-gouwuche' }]
    let home_btn = [{ text: '首页', icon: 'icon-zhuye' }]
    return {
      tabbar_icon_text,
      home_btn
    }
  }
}
</script>
<style lang="scss" scoped>
.top_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  .top_bar_head{
    position: relative;
    right: 160px;
  }
  .search {
    width: 30%;
    margin-right: 10px;
  }
  .tab_bar_icon {
    margin: 0 8px;
  }
  .login {
    position: relative;
    left: 60px;
  }
}
.router_view_wrapper {
  display: flex;
  justify-content: center;
  .router_view {
    width: 1000px;
  }
}
</style>