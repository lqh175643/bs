<template>
  <div class="login_wrapper">
    <div class="top_notice">欢迎登录！注册即领取优惠券</div>
    <div class="loginBg_wrapper">
      <img class="loginBg" src="../assets/loginBg.jpg" alt="登录背景" />
    </div>
    <div class="login_form">
      <div class="login_form_header">欢迎登录</div>
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
          <el-input v-model="ruleForm.user" placeholder="用户名/手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="login_btn" @click="submitForm">登&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp录</div>
      <div class="login_form_line"></div>
      <div class="register" @click="register">立即注册</div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, reactive } from 'vue';
import { login } from '../api/login'
import { useRouter } from 'vue-router'

import { ElNotification } from 'element-plus'

import { set_local_storage } from '../utils/storage'

export default {
  name: 'Login',
  setup(props) {
    const router = useRouter()
    const ruleFormRef = ref()
    const ruleForm = reactive({
      user: '',
      pass: '',
    })
    function submitForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          const param = {
            user: ruleForm.user,
            pass: window.btoa(ruleForm.pass)
          }
          login(param).then(res => {
            if (res.code == 1) {
              if (res.token) {
                set_local_storage('token', res.token)
              } else {
                throw '获取token失败'
              }
              router.push({
                path: '/home'
              })
            } else {
              ElNotification({
                title: '登录失败',
                message: res.mes,
                type: 'warning'
              })
            }
          }, err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const validatePass = (rule, value, callback) => {
      // ruleForm.pass = ''
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (ruleForm.user === '') {
        callback(new Error('请先输入用户名'))
      } else {
        callback()
      }
    }
    const register = function () {
      router.push({
        path: `/register`
      })
    }
    return {
      ruleForm,
      rules: {
        user: [{ validator: validatePass, trigger: 'change' }],
        pass: [{ validator: validatePass2, trigger: 'change' }]
      },
      ruleFormRef,
      submitForm,
      register
    }
  }
}
</script>
<style lang="scss" scoped>
.login_wrapper {
  margin-top: 0px !important;
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
    background: linear-gradient(
      101.1deg,
      rgba(252, 253, 255, 0) 0%,
      rgba(120, 190, 18, 1) 50%,
      rgba(252, 253, 255, 0) 100%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    .loginBg {
      width: 1000px;
    }
  }
  .login_form {
    background-color: rgba(255,255,255,0.6);
    width: 435px;
    height: 352px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
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
      font-weight: bold;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      background-color: #e4393c;
      width: 80%;
    }
    .register {
      position: relative;
      top: 10px;
      left: 142px;
      cursor: pointer;
    }
  }
}
</style>