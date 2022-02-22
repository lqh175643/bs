<template>
  <div class="wrapper_recA">
    <el-button @click="dialogTableVisible = true" class="create_btn"
      >新增收货地址</el-button
    >
    <el-dialog v-model="dialogTableVisible" :title="title" :width="490">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="收货人" required prop="user">
          <el-input
            v-model="formData.user"
            placeholder="用户名"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址" required prop="receivingAddress">
          <el-cascader
            v-model="formData.receivingAddress"
            :options="addressSelectOptions"
            @change="handleAddress"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="手机号码" required prop="phoneNumber">
          <el-input
            v-model="formData.phoneNumber"
            placeholder="手机号"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" required prop="email">
          <el-input v-model="formData.email" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
    <div v-for="item in store.getters?.receivingAddress" :key="item.addr_id">
      <ReceiveAddr :addrs="item" />
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { holdUserInfo } from '../../utils/util'
import { modifyReceivingAddress } from "../../api/userHome";
import { addr } from "../../utils/constant";

import ReceiveAddr from "../../components/ReceiveAddr.vue";
export default {
  name: "ReceivingAddress",
  components: {
    ReceiveAddr,
  },
  setup() {
    let dialogTableVisible = ref(false);
    let title = ref("新增收货地址");
    const store = useStore();
    const addressSelectOptions = addr;
    const ruleFormRef = ref();
    const formData = reactive({
      user: "",
      receivingAddress: "",
      phoneNumber: "",
      email: "",
    });
    function submitForm() {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          formData.addr_id = Date.now()
          modifyReceivingAddress(formData).then(
            (res) => {
              dialogTableVisible.value = false;
              holdUserInfo(store)
              console.log(res);
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
    const validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入收货人"));
      } else {
        callback();
      }
    };
    const validateReceivingAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择收货地址"));
      } else {
        callback();
      }
    };
    const validatePhoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      dialogTableVisible,
      title,
      formData,
      rules: {
        user: [{ validator: validateUser, trigger: "change" }],
        receivingAddress: [
          { validator: validateReceivingAddress, trigger: "change" },
        ],
        phoneNumber: [{ validator: validatePhoneNumber, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
      ruleFormRef,
      submitForm,
      addressSelectOptions,
      store,
    };
  },
};
</script>
<style lang="scss">
.footer {
  margin-right: 50px;
}
.wrapper_recA {
  margin: 30px 0 0 0;
}
.create_btn {
  margin-bottom: 20px;
}
</style>