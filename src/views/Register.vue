<template>
  <div class="login_wrapper">
    <div class="top_notice">欢迎注册！领取优惠券</div>
    <div class="loginBg_wrapper">
      <img class="loginBg" src="../assets/loginBg.jpg" alt="注册背景" />
    </div>
    <div class="login_form">
      <div class="login_form_header">欢迎注册</div>
      <div class="login_form_line"></div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass2">
          <el-input v-model="ruleForm.pass2" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="login_btn" @click="submitForm">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</div>
      <div class="login_form_line"></div>
      <div class="register" @click="login">已有帐号？登录</div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, reactive, h } from 'vue';
import { register } from '../api/register'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

export default {
  name: 'Register',
  setup(props) {
    const ruleFormRef = ref()
    const ruleForm = reactive({
      user: '',
      pass: '',
      phone: '',
      pass2: ''
    })
    const router = useRouter()
    function login() {
      router.push({
        path: '/login'
      })
    }
    function submitForm() {
      const param = {
        user: ruleForm.user,
        pass: ruleForm.pass,
        phone: ruleForm.phone
      }
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          register(param).then(res => {
            console.log(res)
            if (res.code == 0) {
              ElNotification({
                title: '注册失败',
                message: res.mes,
                type: 'warning'
              })
            } else if (res.code == 1) {
              ElNotification({
                title: '注册成功',
                message: '即将跳转到登录界面',
                type: 'success'
              })
              setTimeout(() => {
                login()
              }, 1000)
            }
          }, err => {
            throw err
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      // ruleForm.pass = ''
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (ruleForm.user === '') {
        callback(new Error('请先输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (ruleForm.user === '') {
        callback(new Error('请先输入用户名'))
      } else if (value !== ruleForm.pass) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm,
      rules: {
        user: [{ validator: validateUser, trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'change' }],
        pass: [{ validator: validatePass, trigger: 'change' }],
        pass2: [{ validator: validatePass2, trigger: 'blur' }]
      },
      ruleFormRef,
      submitForm,
      login
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
    background-color: rgba(255,255,255,.6);
    width: 435px;
    height: 455px;
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