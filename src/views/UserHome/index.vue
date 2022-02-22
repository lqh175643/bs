<template>
  <div class="wrapper">
    <div class="app_title">校园购物</div>
    <div class="content">
      <div class="content_left">
        <div class="content_left_head">
          <img
            src="https://s11.mogucdn.com/mlcdn/5abf39/211231_65lk47e3281ei18969g8g5e1a89ki_100x100.jpg_100x100.jpg"
            alt="头像"
          />
          <span class="content_left_head_username">{{
            username || "mdhawji"
          }}</span>
          <div class="content_left_head_line"></div>
        </div>
        <div class="content_left_bar">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @click="itemClick"
          >
            <el-sub-menu index="1">
              <template #title>
                <i class="iconfont icon-dingdan"></i>
                <span>我的订单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" data-index="1-1">
                  <i class="iconfont icon-quanbudingdan"></i>全部订单
                </el-menu-item>
                <el-menu-item index="1-2" data-index="1-2">
                  <i class="iconfont icon-daifukuan"></i>待付款
                </el-menu-item>
                <el-menu-item index="1-3" data-index="1-3">
                  <i class="iconfont icon-daishouhuo"></i>待收货
                </el-menu-item>
                <el-menu-item index="1-4" data-index="1-4">
                  <i class="iconfont icon-daipingjia"></i>待评价
                </el-menu-item>
                <el-menu-item index="1-5" data-index="1-5">
                  <i class="iconfont icon-tuikuantuihuo"></i>退款退货
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2" data-index="2">
              <template #title>
                <i class="iconfont icon-gouwuche"></i>购物车
              </template>
            </el-menu-item>
            <el-menu-item index="3" data-index="3">
              <template #title>
                <i class="iconfont icon-shoucang"></i>收藏
              </template>
            </el-menu-item>
            <el-menu-item index="4" data-index="4">
              <template #title>
                <i class="iconfont icon-zuji"></i>足迹
              </template>
            </el-menu-item>
            <el-menu-item index="5" data-index="5">
              <template #title>
                <i class="iconfont icon-gerenxinxi"></i>个人信息
              </template>
            </el-menu-item>
            <el-menu-item index="6" data-index="6">
              <template #title>
                <i class="iconfont icon-shouhuodizhi"></i>收货地址
              </template>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="content_right">
        <Search />
        <div class="goHome" @click="goHome">
          <IconText
            text="首页"
            icon="icon-zhuye"
            class="tab_bar_icon"
          ></IconText>
        </div>
        <template v-if="tableData.length <= 0">
          <el-empty description=" " :image-size="400">
            <div class="empty_text">什么也没有</div>
          </el-empty>
        </template>
        <template v-else>
          <router-view />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Search from "../../components/Search.vue";
import IconText from "../../components/IconText.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "index",
  components: {
    Search,
    IconText,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const uid = store.state.id;
    const itemClick = (e) => {
      if (e.target.localName == "li") {
        const index = e.target.dataset.index;
        console.log(e.target.dataset.index);
        switch (index) {
          case "1-1":
            router.push({
              path: "/userHome/order",
              params: {
                uid,
              },
            });
            break;
          case "2":
            router.push({
              path: "/userHome/shopbus",
              params: {
                uid,
              },
            });
            break;
          case "3":
            router.push({
              path: "/userHome/collection",
              params: {
                uid,
              },
            });
            break;
          case "4":
            router.push({
              path: "/userHome/footprint",
              params: {
                uid,
              },
            });
            break;
          case "5":
            router.push({
              path: "/userHome/userinfo",
              params: {
                uid,
              },
            });
            break;
          case "6":
            router.push({
              path: "/userHome/receivingaddress",
              params: {
                uid,
              },
            });
            break;
          default:
            break;
        }
      }
    };
    const tableData = [
      {
        goods: {
          img: "https://s11.mogucdn.com/mlcdn/5abf39/211231_65lk47e3281ei18969g8g5e1a89ki_100x100.jpg_100x100.jpg",
          des: "我gdiwuahdowaihdoiwahoidjwaiojdiowahdfoiwhaiodhjwaiohdoiuwahduiwadwadwadwadwadwadwa",
        },
        price: 180,
        count: 1,
        saled: "暂无售后",
        allPrice: 988,
        status: 0,
        operation: ["delete", "check"],
      },
      {
        goods: {
          img: "https://s11.mogucdn.com/mlcdn/5abf39/211231_65lk47e3281ei18969g8g5e1a89ki_100x100.jpg_100x100.jpg",
          des: "我gdiwuahdowaihdoiwahoidjwaiojdiowahdfoiwhaiodhjwaiohdoiuwahduiwadwadwadwadwadwadwa",
        },
        price: 180,
        count: 1,
        saled: "暂无售后",
        allPrice: 988,
        status: 0,
        operation: ["delete", "check"],
      },
    ];
    const goHome = function () {
      router.push({
        path: "/",
      });
    };
    return {
      tableData,
      itemClick,
      goHome,
    };
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 25px;
  margin-right: 10px;
}

.iconfont {
  font-size: 25px;
  margin-right: 10px;
}
:deep(.el-menu) {
  .el-sub-menu__title {
    font-size: 20px !important;
  }
  .el-menu-item {
    font-size: 18px !important;
  }
}

.empty_text {
  font-size: 30px;
}
.wrapper {
  width: 1200px;
  margin: 0 auto;
  .app_title {
    font-family: simsun;
    font-size: 50px;
    font-weight: 700;
    text-shadow: 2px 2px 10px;
  }
  .content {
    width: 100%;
    display: flex;
    margin-top: 50px;
    .content_left {
      flex: 1;
      // background-color: rgba(0,0,0,0.1);
      .content_left_head {
        height: 260px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
        .content_left_head_username {
          font-size: 20px;
        }
        .content_left_head_line {
          width: 150px;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .content_left_bar {
      }
    }
    .content_right {
      flex: 5;
      box-sizing: border-box;
      padding-left: 50px;
      margin-top: 16px;
      .goHome {
        display: inline-block;
        float: right;
        cursor: pointer;
        .tab_bar_icon {
          margin: 0 8px;
        }
      }
    }
  }
}
</style>
