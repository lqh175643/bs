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
            <div class="modifyPas" @click="modifyPassword">修改密码</div>
          </div>
        </template>
        <span class="username">{{ username }}</span>
      </el-tooltip>
    </template>
    <template v-else>
      <span class="username">{{ "登录" }}</span>
    </template>
    <el-dialog v-model="visibleModify" title="修改密码" width="30%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="ruleForm.user"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldpass">
          <el-input
            v-model="ruleForm.oldpass"
            type="password"
            placeholder="旧密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass1">
          <el-input
            v-model="ruleForm.newpass1"
            type="password"
            placeholder="新密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newpass2">
          <el-input
            v-model="ruleForm.newpass2"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visibleModify = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { deleteUserInfo } from "../utils/util";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { get_local_storage } from "../utils/storage";
import { modifyUserpass } from "../api/login";
import { ref, reactive } from "vue";

export default {
  name: "Login",
  props: {
    username: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const ruleFormRef = ref();
    const router = useRouter();
    const store = useStore();
    const visibleModify = ref(false);
    const ruleForm = reactive({
      user: "",
      oldpass: "",
      newpass1: "",
      newpass2: "",
    });
    const loginClick = function () {
      const token = get_local_storage("token");
      if (!token) {
        router.push({
          path: "/login",
        });
      }
      return;
    };
    const userHome = function () {
      router.push({
        path: "/userHome",
      });
    };
    const logout = function () {
      deleteUserInfo(store);
      ElNotification({
        title: "退出成功",
        type: "success",
      });
    };
    const modifyPassword = () => {
      visibleModify.value = true;
    };
    function submitForm() {
      const param = {
        user: ruleForm.user,
        oldpass: ruleForm.oldpass,
        newpass: ruleForm.newpass1,
      };
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          modifyUserpass(param).then(
            (res) => {
              if (res.code == 1) {
                ElNotification({
                  title: "修改成功",
                  message: "即将跳转到登录界面",
                  type: "success",
                });
                setTimeout(() => {
                  router.push({
                    path: "/login",
                  });
                  logout();
                }, 1000);
              } else {
                ElNotification({
                  title: "修改失败",
                  message: res.mes,
                  type: "warning",
                });
              }
            },
            (err) => {
              throw err;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    const validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validateOldpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    const validateNewpass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (ruleForm.user === "") {
        callback(new Error("请先输入用户名"));
      } else {
        callback();
      }
    };
    const validateNewpass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else if (ruleForm.user === "") {
        callback(new Error("请先输入用户名"));
      } else if (value !== ruleForm.newpass1) {
        callback(new Error("两次新密码不一致"));
      } else {
        callback();
      }
    };

    return {
      loginClick,
      logout,
      modifyPassword,
      userHome,
      submitForm,
      visibleModify,
      ruleForm,
      rules: {
        user: [{ validator: validateUser, trigger: "change" }],
        oldpass: [{ validator: validateOldpass, trigger: "change" }],
        newpass1: [{ validator: validateNewpass1, trigger: "change" }],
        newpass2: [{ validator: validateNewpass2, trigger: "change" }],
      },
      ruleFormRef,
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  cursor: pointer;
  display: flex;
  align-items: center;
  .wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: pink;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon_bgc {
      font-size: 40px;
      color: white;
    }
  }
  .username {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80px;
    font-size: 24px;
  }
}
.content_wrapper {
  cursor: pointer;
  font-size: 18px !important;
  color: black;
  div {
    margin: 5px 0;
  }
}
</style>