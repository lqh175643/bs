<template>
  <div class="wrapper_userinfo">
    <div class="settings_title"><span>基本资料</span></div>
    <el-form :model="formData" label-width="60px" class="demo-formData">
      <el-form-item label="用户名">
        {{ store.getters.username }}
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formData.sex" :label="0" size="large">女</el-radio>
        <el-radio v-model="formData.sex" :label="1" size="large">男</el-radio>
      </el-form-item>
      <el-form-item label="所在地">
        <div class="example-block">
          <el-cascader
            v-model="formData.address"
            :options="options"
            @change="handleAddress"
          ></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
          v-model="formData.birthday"
          type="date"
          placeholder="Pick a day"
        />
      </el-form-item>
      <el-form-item label="职业">
        <el-select
          v-model="formData.occupation"
          class="m-2"
          placeholder="请选择"
        >
          <el-option
            v-for="item in occupationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="settings_title"><span>自我介绍</span></div>
    <el-input
      v-model="formData.introduction"
      :rows="5"
      style="width: 500px"
      type="textarea"
      placeholder="随便写点什么，让大家了解你吧。"
    />
    <el-button class="submit" @click="submitForm">修改完成</el-button>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { holdUserInfo } from "../../utils/util";
import { modifyUserInfo } from "../../api/userHome";
import { addr } from "../../utils/constant";
export default {
  name: "UserInfo",
  setup() {
    const store = useStore();
    const userInfo = store.getters.userInfo;
    const formData = reactive({
      sex: userInfo.sex || "",
      address: userInfo.address || [],
      birthday: userInfo.birthday || "",
      occupation: userInfo.occupation || "",
      introduction: userInfo.introduction || "",
    });
    const options = addr;
    const occupationOptions = [
      {
        value: "student",
        label: "学生",
      },
      {
        value: "teacher",
        label: "老师",
      },
      {
        value: "other",
        label: "其他",
      },
    ];

    function submitForm() {
      modifyUserInfo(formData).then(
        (res) => {
          ElMessage({
            message: "个人信息保存成功",
            type: "success",
            offset: 60,
          });
        },
        (err) => {
          console.log(err);
        }
      );
      holdUserInfo(store);
    }
    const handleAddress = (e) => {
      // console.log(e);
    };
    return {
      submitForm,
      formData,
      store,
      options,
      handleAddress,
      occupationOptions,
    };
  },
};
</script>
<style lang="scss">
.wrapper_userinfo {
  margin: 30px 0 0 0;
}
.settings_title {
  background: #f9f9f9;
  width: 649px;
  height: 30px;
  padding: 0 10px 0 20px;
  margin-bottom: 14px;
  background-color: $mybgc6;
  span {
    color: #ff6aa2;
    font-size: 14px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
  }
}
.submit {
  display: block;
  margin-top: 20px;
}
</style>
