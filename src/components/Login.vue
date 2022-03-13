<template>
  <div class="main" @click="loginClick">
    <div class="wrapper">
      <i class="iconfont icon-denglu icon_bgc"></i>
    </div>
    <template v-if="username">
      <el-tooltip placement="bottom" effect="light">
        <template #content>
          <div class="content_wrapper">
            <div class="vip" @click="vip">plus会员</div>
            <div class="user_info" @click="userHome">个人主页</div>
            <div class="logout" @click="logout">退出</div>
            <div class="modifyPas" @click="modifyPassword">修改密码</div>
            <div
              class="invitation"
              v-if="store.getters.isAdministrator"
              @click="invitation"
            >
              添加商品
            </div>
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
    <el-dialog
      v-model="dialogVip"
      title="我的plus会员"
      custom-class="dialog_wrapper"
      :width="600"
      :destroy-on-close="true"
    >
      <div class="bold_text">我的会员</div>
      <div class="content_plus">到期时间 {{vip_time}}</div>
      <div class="bold_text">plus会员特权</div>
      <div class="content_plus">1.双倍反校园豆</div>
      <div class="content_plus">2.专享plus会员特价</div>
      <div class="bold_text">选择会员</div>
      <VipCategory
        v-for="(item, index) in vipMap"
        :time="item.time"
        :price="item.price"
        :key="index"
        :isActive="vipNum == index"
        data-Num="1"
        @click="vipNumChange(index)"
      />

      <template #footer>
        <div class="footer_wrapper">
          <span class="payBtn" @click="goPay">开通</span>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="visibleInvitation"
      title="添加商品"
      custom-class="dialog_wrapper"
      :width="600"
      :destroy-on-close="true"
    >
      <el-form
        ref="formRefInvitation"
        :model="formInvitation"
        status-icon
        :rules="rulesInvitation"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品ID" prop="jid" required>
          <el-input
            v-model="formInvitation.jid"
            placeholder="商品ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" required>
          <el-input v-model="formInvitation.price"></el-input>
        </el-form-item>
        <el-form-item label="展示图片" prop="picture" required>
          <el-input v-model="formInvitation.picture"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="des" required>
          <el-input v-model="formInvitation.des"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category" required>
          <el-select v-model="formInvitation.category">
            <el-option
              v-for="item in selectCategory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品图组" prop="pictures" required>
          <el-input
            v-model="formInvitation.pictures"
            placeholder="请使用英文逗号分割"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品介绍图组" prop="introductionPictures" required>
          <el-input
            v-model="formInvitation.introductionPictures"
            placeholder="请使用英文逗号分割"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer_wrapper">
          <span class="payBtn" @click="goCreated">添加</span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { deleteUserInfo,formatDate } from "../utils/util";
import { useStore } from "vuex";
import { ElNotification, ElMessage } from "element-plus";
import { get_local_storage } from "../utils/storage";
import { modifyUserpass } from "../api/login";
import { ref, reactive, computed } from "vue";
import { addGood, vipChange } from "../api/home";
import VipCategory from "../components/VipCategory.vue";
import { selectCategorys, vipMap } from "../utils/constant";

export default {
  name: "Login",
  props: {
    username: {
      type: String,
      default: "",
    },
  },
  components: {
    VipCategory,
  },
  setup(props) {
    const ruleFormRef = ref();
    const formRefInvitation = ref();
    const router = useRouter();
    const store = useStore();
    const visibleModify = ref(false);
    const visibleInvitation = ref(false);
    const vipNum = ref(1);
    const dialogVip = ref(false);
    const selectCategory = selectCategorys;
    const vipTime = formatDate(store.getters.vip)
    const ruleForm = reactive({
      user: "",
      oldpass: "",
      newpass1: "",
      newpass2: "",
      category: "",
    });
    const formInvitation = reactive({
      jid: "",
      price: "",
      picture: "",
      des: "",
      pictures: "",
      introductionPictures: "",
    });
    const vip_time = computed(() => {
      return formatDate(store.getters.vip);
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
    const vip = () => {
      dialogVip.value = true;
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
    const invitation = () => {
      visibleInvitation.value = true;
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
    const vipNumChange = (e) => {
      vipNum.value = e;
    };
    const goPay = () => {
      const params = {
        time: vipMap[vipNum.value].time,
      };
      vipChange(params).then(
        (res) => {
          ElMessage({
            message: "开通成功，恭喜成为超级用户",
            type: "success",
            offset: 60,
          });
          visibleVip.value = false;
        },
        (err) => {
          ElMessage({
            message: "开通失败",
            type: "error",
            offset: 60,
          });
        }
      );
    };
    const goCreated = () => {
      formRefInvitation.value.validate((valid) => {
        if (valid) {
          addGood(formInvitation).then(
            (res) => {
              ElMessage({
                message: "添加成功",
                type: "success",
                offset: 60,
              });
              visibleInvitation.value = false;
            },
            (err) => {
              ElMessage({
                message: "添加失败",
                type: "error",
                offset: 60,
              });
              visibleInvitation.value = false;
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
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
      vip,
      vip_time,
      goPay,
      dialogVip,
      visibleModify,
      visibleInvitation,
      ruleForm,
      rules: {
        user: [{ validator: validateUser, trigger: "change" }],
        oldpass: [{ validator: validateOldpass, trigger: "change" }],
        newpass1: [{ validator: validateNewpass1, trigger: "change" }],
        newpass2: [{ validator: validateNewpass2, trigger: "change" }],
      },
      rulesInvitation: {},
      ruleFormRef,
      selectCategory,
      goCreated,
      invitation,
      formInvitation,
      formRefInvitation,
      store,
      vipNum,
      vipNumChange,
      vipMap,
      vipTime
    };
  },
};
</script>
<style lang="scss" scoped>
.main {
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: $mybgc6;
  padding: 4px;
  border-radius: 8px;
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
.content_plus {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 5px;
}
// .dialog_wrapper {
//   height: 600px;
//   background-color: aquamarine;
//   max-height: 600px;
//   font-weight: 600;
//   overflow-y: auto;
//   position: relative;
// }
.footer_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .payBtn {
    position: absolute;
    right: 0;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 60px;
    background-color: deeppink;
    color: white;
    cursor: pointer;
  }
}
.bold_text {
  margin-bottom: 10px;
}
</style>