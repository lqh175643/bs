<template>
  <div class="top_bar">
    <Search class="search"></Search>
    <template v-for="item in tabbar_icon_text">
      <IconText :text="item.text" :icon="item.icon" class="tab_bar_icon"></IconText>
    </template>
    <Login class="login"></Login>
  </div>
  <router-view />
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
    return {
      tabbar_icon_text
    }
  }
}
</script>
<style lang="scss" scoped>
.top_bar {
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>