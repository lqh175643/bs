<template>
  <div class="main" @click="loginClick">
    <div class="wrapper">
      <i class="iconfont icon-denglu icon_bgc"></i>
    </div>
    <template v-if="username">
      <el-tooltip placement="bottom" effect="light">
        <template #content>
          <div class="content_wrapper">
            <div class="user_info" @click="userHome">个人主页</div>
            <div class="logout" @click="logout">退出</div>
            <div class="order">订单</div>
          </div>
        </template>
        <span class="username">{{ username }}</span>
      </el-tooltip>
    </template>
    <template v-else>
      <span class="username">{{ '登录' }}</span>
    </template>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { deleteUserInfo } from '../utils/util'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'

export default {
  name: 'Login',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const loginClick = function () {
      router.push({
        path: '/login'
      })
    }
    const userHome = function(){
      router.push({
        path: '/userHome'
      })
    }
    const logout = function () {
      deleteUserInfo(store)
      ElNotification({
        title: '退出成功',
        type: 'success'
      })
    }
    return {
      loginClick,
      logout,
      userHome
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon_bgc {
      font-size: 25px;
      color: white;
    }
  }
  .username {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80px;
    font-size: 16px;
  }
}
.content_wrapper {
  cursor: pointer;
  font-size: 18px !important;
  color: aqua;
  div {
    margin: 5px 0;
  }
}
</style>