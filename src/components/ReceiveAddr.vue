<template>
  <div class="addr_wrapper">
    <div class="header">
      {{ formData.user + " " + formData.head_add }}
      <i
        :class="['iconfont', 'icon-guanbi', 'float_right']"
        @click="dialogVisible = true"
      ></i>
    </div>
    <el-form :model="formData" class="form">
      <el-form-item label="收货人 :">
        {{ formData.user }}
      </el-form-item>
      <el-form-item label="收货地址 :">
        {{ formData.receivingAddress }}
      </el-form-item>
      <el-form-item label="电话号码 :">
        {{ formData.phoneNumber }}
      </el-form-item>
      <el-form-item label="邮箱 :">
        {{ formData.email }}
      </el-form-item>
    </el-form>
  </div>
  <el-dialog v-model="dialogVisible" title="确定移除" width="30%">
    <span>是否移除此地址</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addrDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { _addrMap, holdUserInfo } from "../utils/util";
import { ElMessage } from "element-plus";
import { deleteUserInfoArr } from "../api/userHome";
export default {
  name: "ReceiveAddr",
  props: {
    addrs: Object,
  },
  setup(props) {
    const store = useStore();
    let dialogVisible = ref(false);
    const addrs = props.addrs;
    const formData = reactive({
      user: addrs.user || "",
      receivingAddress: _addrMap(addrs.receivingAddress) || "",
      phoneNumber: addrs.phoneNumber || "",
      email: addrs.email || "",
      head_add: _addrMap(addrs.receivingAddress).split("/")[0] || "",
      addr_id: addrs.addr_id || "",
    });
    const addrDelete = () => {
      deleteUserInfoArr({
        target: "receivingAddress",
        val: { addr_id: formData.addr_id },
      }).then(
        (res) => {
          dialogVisible.value = false;
          holdUserInfo(store);
          ElMessage({
            message: "删除成功",
            type: "success",
            offset: 60,
          });
        },
        (err) => {
          ElMessage({
            message: "删除失败",
            type: "error",
            offset: 60,
          });
        }
      );
    };
    return {
      formData,
      addrDelete,
      dialogVisible,
    };
  },
};
</script>
<style lang="scss">
.float_right {
  float: right;
  margin-right: 10px;
  font-size: 40px;
  cursor: pointer;
}
.header {
  color: #666;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.form {
  margin-left: 30px;
}
.addr_wrapper {
  width:96%;
}
.addr_wrapper {
  border: 2px solid #e6e6e6;
  margin: 16px 0 0 0;
  padding: 0 0 0 20px;
}
</style>