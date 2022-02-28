<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="结算页"
    custom-class="dialog_wrapper"
    :before-close="dialogClose"
    :width="600"
    :destroy-on-close="true"
  >
    <div class="bold_text">收货人信息</div>
    <div class="shop_body_item">
      <el-select
        v-model="formData.receiveInfo"
        placeholder="Select"
        size="large"
        style="width: 300px"
      >
        <el-option
          v-for="item in receiveInfo"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="bold_text">支付方式</div>
    <div class="shop_body_item">
      <el-radio
        v-model="formData.payMethod"
        v-for="(item, index) in payMethods"
        :key="index"
        :label="item"
        size="large"
        class="pay_method"
        >{{ item }}</el-radio
      >
    </div>
    <div class="bold_text">送货清单</div>
    <div class="shop_body_item">
      <div class="good_item" v-for="(good, index) in buyData" :key="index">
        <img class="good_img" :src="good.img" />
        <span class="good_des">{{ good.des }}</span>
        <i class="good_price">￥{{ good.price }}</i>
        <span class="good_count">×{{ good.count }}</span>
      </div>
    </div>
    <div class="shop_body_item">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="优惠券" name="1">
          <div class="consumer_coupons">
            <div
              class="consumer_coupon"
              v-for="(item, index) in consumerCoupons"
              :key="index"
              @click="handleCoupons(index, item.price)"
            >
              <Coupon
                :coupon="item"
                class="coupon"
                :is-active="active_coupons === index"
                :is-disabled="allPrice <= item.price"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="校园豆" name="2">
          <div class="campusBean">
            账户共 {{ store.getters.campusBean }} 校园豆<br />本次使用
            <el-select
              v-model="formData.campusBean"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in campusBeanOptions"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                :disabled="item.value >= store.getters.campusBean"
              >
              </el-option>
            </el-select>
            抵扣￥{{ formData.campusBean / 100 }}
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <div class="footer_wrapper">
        <span class="allPrice">总计:￥{{ allPrice }}</span>

        <span class="payBtn" @click="goPay">去支付</span>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { _addrMap } from "../utils/util";
import { ElMessage, ElLoading } from "element-plus";
import Coupon from "../components/Coupon.vue";
import { generateOrder } from "../api/order";
export default {
  name: "Shoping",
  components: {
    Coupon,
  },
  props: {
    buyData: {
      type: Object,
      default: () => {},
    },
    dialogTableVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["shopClose", "myrefresh"],
  setup(props, cxt) {
    const buyData = Array.isArray(props.buyData)
      ? props.buyData
      : [props.buyData];
    const store = useStore();
    const active_coupons = ref();
    const dialogTableVisible = computed(() => props.dialogTableVisible);
    const activeName = ref("1");
    const addrs = store.getters.receivingAddress;
    const receiveInfo = addrs.map((addr) => {
      return {
        value: addr.addr_id,
        label:
          addr.user +
          " " +
          _addrMap(addr.receivingAddress) +
          " " +
          addr.phoneNumber,
      };
    });
    const payMethods = ["微信", "支付宝"];
    const consumerCoupons = store.getters.consumerCoupon;
    const originalPrice = computed(() => {
      let temp = 0;
      buyData.forEach((item) => (temp += Number(item.price) * item.count));
      return temp;
    });
    const allPrice = computed(() => {
      const reduce = formData.consumerCoupon.reduce;
      let consumerCoupon = reduce ? reduce : 0;
      let val = 0;
      buyData.forEach((item) => (val += Number(item.price) * item.count));
      val = val - formData.campusBean / 100 - consumerCoupon;
      return val;
    });

    const formData = reactive({
      receiveInfo: "",
      payMethod: "微信",
      consumerCoupon: "",
      campusBean: 0,
    });
    const dialogClose = () => {
      cxt.emit("shopClose");
      active_coupons.value = -1;
      formData.campusBean = 0;
      formData.consumerCoupon = "";
    };
    const handleCoupons = (e, price) => {
      if (price <= originalPrice.value) {
        active_coupons.value = e;
        switch (price) {
          case 10:
            formData.consumerCoupon = {
              reduce: 2,
            };
            break;
          case 99:
            formData.consumerCoupon = {
              reduce: 10,
            };
            break;
          default:
            break;
        }
      }
    };
    const goPay = () => {
      if (!formData.receiveInfo) {
        ElMessage({
          message: "请填写收货人信息",
          type: "warning",
          offset: 60,
        });
        return;
      }
      const loading = ElLoading.service({
        lock: true,
        text: "订单生成中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(buyData);
      generateOrder({
        goods: buyData.map((val) => {
          return {
            jid: val.jid,
            count: val.count,
            des: val.des,
            price: val.price,
            img: val.img,
            category: val.category,
            isComment:false
          };
        }),
        generateTime: Date.now(),
        originalPrice: originalPrice.value,
        finalPrice: allPrice.value,
        coupon: formData.consumerCoupon,
        campusBean: formData.campusBean,
        receiveInfo: formData.receiveInfo,
        payMethod: formData.payMethod,
        isPay: true,
        isReceive: false
      }).then(
        () => {
          setTimeout(() => {
            loading.close();
            cxt.emit("shopClose");
            ElMessage({
              message: "购买成功，查看请到我的订单",
              type: "success",
              offset: 60,
            });
          }, 1000);
          cxt.emit("myrefresh");
        },
        (err) => {
          console.log(err);
        }
      );
    };
    return {
      dialogTableVisible,
      formData,
      receiveInfo,
      payMethods,
      dialogClose,
      buyData,
      allPrice,
      consumerCoupons,
      activeName,
      store,
      goPay,
      handleCoupons,
      active_coupons,
      campusBeanOptions: [
        {
          value: 100,
        },
        {
          value: 200,
        },
        {
          value: 500,
        },
        {
          value: 1000,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scope>
:deep(.select-trigger) {
  .el-input {
    width: 300px;
  }
}
.pay_method {
  font-size: 24px !important;
  font-family: simsun;
  font-weight: 600;
}

.footer_wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .allPrice {
    position: absolute;
    right: 150px;
  }
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
.shoping_footer {
  position: sticky;
  bottom: 0px;
  background-color: #999;
  width: 500px;
  height: 40px;
}
.bold_text {
  font-size: 18px;
  margin-bottom: 10px;
}
.dialog_wrapper {
  max-height: 600px;
  font-weight: 600;
  overflow-y: auto;
  position: relative;
}
.dialog_wrapper::-webkit-scrollbar {
  width: 4px;
}
.dialog_wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.dialog_wrapper::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.campusBean {
  line-height: 36px;
}
.demo-tabs {
  font-size: 16px;

  .el-tabs__header {
    .el-tabs__nav-wrap {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 18px !important;
          font-weight: 600;
        }
      }
    }
  }
}
.shop_body_item {
  margin-bottom: 10px;
  font-family: simsun;
  .good_item {
    display: flex;
    align-items: center;
    height: 200px;
    .good_img {
      height: 80%;
      margin: 0 10px 0 10px;
    }
    .good_des {
      width: 200px;
      font-size: 18px;
      vertical-align: middle;
      overflow: hidden;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
    .good_price {
      font-size: 18px;
      margin-left: 30px;
    }
    .good_count {
      font-size: 20px;
      margin-left: 20px;
    }
  }
}
.consumer_coupons {
  display: flex;
  flex-wrap: wrap;
  .consumer_coupon {
    width: 33.33%;
  }
  .coupon {
  }
}
</style>