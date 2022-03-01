<template>
  <div class="top_bar">
    <div class="top_bar_head">
      <template v-for="(item,index) in home_btn" :key="index">
        <div class="goHome" @click="goHome">
          <IconText
            :text="item.text"
            :icon="item.icon"
            class="tab_bar_icon"
          ></IconText>
        </div>
      </template>
    </div>
    <Search class="search"></Search>
    <template v-for="(item,index) in tabbar_icon_text" :key="index">
      <IconText
        :text="item.text"
        :icon="item.icon"
        class="tab_bar_icon"
        @click="changePath(item.path)"
      ></IconText>
    </template>
    <Login :username="store.getters.username" class="login_icon"></Login>
  </div>
  <div class="router_view_wrapper">
    <div class="router_view">
      <router-view />
    </div>
  </div>
</template>
<script>
import Search from "../components/Search.vue";
import IconText from "../components/IconText.vue";
import Login from "../components/Login.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "homeLayout",
  components: {
    Search,
    IconText,
    Login,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    let tabbar_icon_text = [
      { text: "消息", icon: "icon-31daipingjia" },
      { text: "收藏", icon: "icon-shoucang", path: "/userHome/collection" },
      { text: "购物车", icon: "icon-gouwuche", path: "/userHome/shopbus" },
    ];
    let home_btn = [{ text: "首页", icon: "icon-zhuye" }];
    const goHome = function () {
      router.push({
        path: "/",
      });
    };
    const changePath = (path) => {
      router.push({
        path
      });
    };
    return {
      goHome,
      changePath,
      tabbar_icon_text,
      home_btn,
      store,
    };
  },
};
</script>
<style lang="scss" scoped>
.top_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  .top_bar_head {
    position: relative;
    right: 160px;
    .goHome {
      cursor: pointer;
    }
  }
  .search {
    width: 30%;
    margin-right: 10px;
    position: relative;
    left: 50px;
  }
  .tab_bar_icon {
    margin: 0 8px;
    position: relative;
    left:50px;
    font-size: 20px;
  }
  .login_icon {
    position: relative;
    left: 120px;
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
