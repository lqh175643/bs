<template>
  <div class="login_wrapper">
    <!-- <div class="top_notice">欢迎登录！注册即领取优惠券</div> -->
    <!-- <div class="loginBg_wrapper">
      <img src="../assets/loginBg.jpg" alt="登录背景" />
    </div> -->
    <div class="login_form">
      <div class="login_form_header">
        {{ isForget ? "密码重置" : "欢迎登陆" }}
      </div>
      <div class="login_form_line"></div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input
            v-model="ruleForm.user"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="!isForget" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" v-else prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <p class="login_btn" v-if="isForget" @click="forgetForm">重置</p>
      <p class="login_btn" v-else @click="submitForm">登录</p>
      <div class="login_form_line"></div>
      <span class="forget" @click="isForget = !isForget">{{
        isForget ? "立即登录" : "密码重置"
      }}</span>
      <span class="register" @click="register">立即注册</span>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, reactive } from "vue";
import { login, forget } from "../api/login";
import { useRouter } from "vue-router";

import { ElNotification } from "element-plus";

import { set_local_storage } from "../utils/storage";

export default {
  name: "Login",
  setup(props) {
    const router = useRouter();
    const ruleFormRef = ref();
    const ruleForm = reactive({
      user: "",
      pass: "",
      phone: "",
    });
    const isForget = ref(false);
    function submitForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          const param = {
            user: ruleForm.user,
            pass: window.btoa(ruleForm.pass),
          };
          login(param).then(
            (res) => {
              if (res.code == 1) {
                if (res.token) {
                  set_local_storage("token", res.token);
                } else {
                  throw "获取token失败";
                }
                router.push({
                  path: "/home",
                });
              } else {
                ElNotification({
                  title: "登录失败",
                  message: res.mes,
                  type: "warning",
                });
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    function forgetForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          const param = {
            user: ruleForm.user,
            phone: window.btoa(ruleForm.phone),
          };
          forget(param).then(
            (res) => {
              ElNotification({
                title: "重置成功",
                message: res.mes,
                type: "success",
              });
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    const validatePass = (rule, value, callback) => {
      // ruleForm.pass = ''
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (ruleForm.user === "") {
        callback(new Error("请先输入用户名"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (ruleForm.user === "") {
        callback(new Error("请先输入用户名"));
      } else {
        callback();
      }
    };
    const register = function () {
      router.push({
        path: `/register`,
      });
    };
    return {
      ruleForm,
      rules: {
        user: [{ validator: validatePass, trigger: "change" }],
        pass: [{ validator: validatePass2, trigger: "change" }],
        phone: [{ validator: validatePhone, trigger: "change" }],
      },
      ruleFormRef,
      submitForm,
      forgetForm,
      register,
      isForget,
    };
  },
};
</script>
<style lang="scss" scoped>
.login_wrapper {
  margin-top: 0px !important;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .top_notice {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 20px;
    height: 60px;
    width: 100%;
    background-color: rgba(221, 234, 241, 1);
    position: absolute;
    top: 0;
  }
  .loginBg_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      background-repeat: no-repeat;
      background-position: right top;
      background-attachment: fixed;
      background-size: cover;
    }
  }
  .login_form {
    background-color: rgba(255, 255, 255, 0.6);
    width: 435px;
    height: 352px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 200px;
    right: calc((100vw - 1000px) / 2 + 80px);
    .demo-ruleForm {
      width: 80%;
      margin-top: 30px;
    }
    .login_form_header {
      font-size: 25px;
      height: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login_form_line {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.1);
      width: 100%;
    }
    .login_btn {
      cursor: pointer;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 20px;
      letter-spacing: 20px;
      font-weight: bold;
      color: white;
      line-height: 40px;
      text-align: center;
      height: 40px;
      background-color: #e4393c;
      width: 80%;
    }
    .forget {
      cursor: pointer;
      position: relative;
      top: 10px;
      right: 142px;
    }
    .register {
      position: relative;
      bottom: 12px;
      left: 142px;
      cursor: pointer;
    }
  }
}
</style>