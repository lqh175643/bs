<template>
  <div class="detail_wrapper">
    <div class="left_swiper">
      <ImagesSwiper :images="detailData.images" />
    </div>
    <div class="middle"></div>
    <div class="right_detail">
      <div class="detail_text">
        <span class></span>
        {{ detailData.productDescription }}
      </div>
      <div class="detail_price">
        <Price :price="detailData.price" />
      </div>
      <div class="address">
        <span class="margin-right-10">配&ensp;送&ensp;至</span>
        <span class="address-select">
          <el-select v-model="address_value" placeholder="Select">
            <el-option
              v-for="item in receiveInfo"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        库存
        <span class="address_count">80</span>
      </div>
      <div class="count">
        <span class="margin-right-10">数&nbsp;&nbsp;量</span>
        <span class="counter">
          <el-input-number
            v-model="buyData.count"
            :min="1"
            :max="10"
            @change="handleChange"
          />
        </span>
      </div>
      <div class="pay_func">
        <span class="margin-right-10">支付方式</span>
        <span class="func">微信</span>
        <span>支付宝</span>
      </div>
      <div class="footer">
        <i
          :class="['iconfont', 'icon-shoucang', 'shoucang']"
          @click="shoucang"
        ></i>
        <div class="buy" @click="buy">立即购买</div>
        <div class="bus" @click="addBus">加入购物车</div>
      </div>
      <div class="service">
        <span class="margin-right-10">服务说明</span>
        <span>
          <i :class="['iconfont', 'icon-kongxinduigou']"></i>1小时内发货
        </span>
        <span>
          <i :class="['iconfont', 'icon-kongxinduigou']"></i>2天无理由退货
        </span>
        <span>
          <i :class="['iconfont', 'icon-kongxinduigou']"></i>全校包邮
        </span>
        <br />
        <span class="next-line">
          <i :class="['iconfont', 'icon-kongxinduigou']"></i>延误必赔
        </span>
      </div>
    </div>
  </div>
  <div class="picture_and_comment">
    <div class="picture_and_comment_header" @click="headerChange">
      <div
        :class="['header_item', header_item_index == 0 ? 'active_item' : '']"
        data-index="0"
      >
        商品介绍
      </div>
      <div
        :class="['header_item', header_item_index == 1 ? 'active_item' : '']"
        data-index="1"
      >
        商品评价{{ goodsCount }}
      </div>
    </div>
    <div class="picture" v-if="header_item_index == 0">
      <template v-for="(item, index) in proPic" :key="index">
        <img :src="item" alt />
      </template>
    </div>
    <div class="commit" v-else>
      <div
        v-for="(item, index) in detailDataComment"
        :key="index"
        class="commit_item"
      >
        <Commit
          :commentData="item"
          :jid="jid"
          :category="category"
          @refresh="commitRefresh"
        />
      </div>
    </div>
  </div>
  <Shoping
    v-if="dialogTableVisible"
    :dialogTableVisible="dialogTableVisible"
    :buyData="buyData"
    :propReceive="address_value"
    @shopClose="dialogTableVisible = false"
  />
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount, reactive, ref, computed, watch } from "vue";
import { getDetail, detailAddBus, detailShoucang } from "../api/detail";
import { urlFilter } from "../utils";

import ImagesSwiper from "../components/ImagesSwiper.vue";
import Price from "../components/Price.vue";
import Commit from "../components/Commit.vue";
import Shoping from "../components/Shoping.vue";
import { ElMessage } from "element-plus";
import { footprint } from "../api/home";
import { holdUserInfo, _addrMap } from "../utils/util";
export default {
  name: "Detail",
  components: {
    ImagesSwiper,
    Price,
    Commit,
    Shoping,
  },
  setup(props) {
    const route = useRouter();
    const store = useStore();
    const dialogTableVisible = ref(false);
    const id = route.currentRoute.value.params.id;
    const category = route.currentRoute.value.params.category;
    const detailData = ref({});
    const address_value = ref("");
    const header_item_index = ref(0);
    const options = { id, category };
    const count = ref(1);
    const proPic = ref([]);
    const buyData = reactive({
      img: "",
      des: "",
      price: "",
      jid: id,
      count: 1,
    });
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
    const handleChange = function () {};
    const headerChange = function (e) {
      if (e.target !== e.currentTarget) {
        header_item_index.value = e.target.dataset.index;
      }
    };
    const buy = function () {
      dialogTableVisible.value = true;
    };
    const addBus = function () {
      const jid = detailData.value.id;
      if (id) {
        detailAddBus({
          target: "shopBus",
          jid,
          count: Number(count.value),
          category,
        }).then((res) => {
          ElMessage({
            message: "加入购物车成功",
            type: "success",
            offset: 60,
          });
          holdUserInfo(store);
        });
      }
    };
    const shoucang = function () {
      const jid = detailData.value.id;
      if (id) {
        detailShoucang({
          target: "collect",
          jid,
          category
        }).then((res) => {
          ElMessage({
            message: "收藏成功",
            type: "success",
            offset: 60,
          });
          holdUserInfo(store);
        });
      }
    };
    onBeforeMount(() => {
      getDetail(options)
        .then((res) => {
          detailData.value = res;
          buyData.img = res.images[0].replace("/n5/", "/n1/");
          buyData.des = res.productDescription;
          buyData.price = res.price;
          const jid = detailData.value.id;
          return Promise.resolve(jid);
        })
        .then((jid) => {
          return footprint({ jid, target: "footprint" });
        })
        .then(
          (res) => {
            holdUserInfo(store);
          },
          (err) => {
            console.log(err);
          }
        );
    });
    const goodsCount = computed(() => {
      return `(${detailData.value.comment?.length >= 10 ? "10+" : ""})`;
    });
    const detailDataComment = computed(() => {
      return detailData.value.comment;
    });
    watch(
      () => detailData.value.introductionPicture,
      () => {
        proPic.value = urlFilter(detailData.value.introductionPicture);
      }
    );
    const commitRefresh = () => {
      getDetail(options)
        .then((res) => {
          detailData.value.comment = res.comment;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      dialogTableVisible,
      detailData,
      count,
      address_value,
      handleChange,
      addBus,
      goodsCount,
      header_item_index,
      headerChange,
      proPic,
      shoucang,
      buy,
      detailDataComment,
      buyData,
      jid: id,
      category,
      commitRefresh,
      receiveInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number) {
  width: 120px;
  line-height: 32px;
  .el-input-number__decrease {
    width: 30px;
    height: 28px;
  }
  .el-input-number__increase {
    width: 30px;
    height: 28px;
  }
  .el-input {
    line-height: 0;
    .el-input__inner {
      height: 30px;
    }
  }
}
.margin-right-10 {
  margin-right: 10px;
}
.detail_wrapper {
  // border-radius: 5px 5px 0 0;
  background-color: $mybgc8;
  margin-top: 30px;
  padding: 30px 30px;
  border-radius: 8px 8px 0 0;
  display: flex;
  .left_swiper {
    flex: 8;
  }
  .middle {
    flex: 1;
  }
  .right_detail {
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
    flex: 10;
    font-family: simsun;
    font-size: 16px;
    font-weight: bold;
    .detail_text {
      font: 700 18px Arial, "microsoft yahei";
    }
    .detail_price {
      margin-top: 20px;
    }
    .service {
      margin-top: 20px;
      i {
        margin-left: 10px;
        margin-right: 4px;
      }
      .next-line {
        display: inline-block;
        margin-top: 20px;
        margin-left: 74px;
      }
    }
    :deep(.address) {
      margin-top: 20px;
      .address-select {
        margin-left: 8px;
        margin-right: 5px;
      }
      .address_count {
      }
      .el-input__inner {
        height: 30px;
        width: 300px;
      }
    }
    .count {
      margin-top: 20px;
      .counter {
        margin-left: 8px;
        width: 100px;
      }
    }
    .pay_func {
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .buy {
        width: 180px;
        height: 50px;
        background-color: rgba(239, 47, 35, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 5px;
        cursor: pointer;
      }
      .bus {
        width: 180px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px gray solid;
        color: black;
        border-radius: 5px;
        cursor: pointer;
      }
      .shoucang {
        font-size: 40px;
        cursor: pointer;
      }
    }
  }
}
.picture_and_comment {
  // margin-top: 40px;
  height: 50px;
  background-color: rgb(255, 255, 255, 0.8);
  border-bottom: 1px red solid;
  .picture {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .commit {
    margin-top: 30px;
    .commit_item {
      &::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background-color: gray;
        margin-bottom: 20px;
      }
    }
  }
  .picture_and_comment_header {
    display: flex;
    height: 100%;

    .header_item {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 100%;
      overflow: auto;
      // &:not(:last-child) {
      //   &::after {
      //     content: "";
      //     display: block;
      //     height: 20px;
      //     width: 1px;
      //     position: relative;
      //     left: 14px;
      //     background-color: gray;
      //   }
      // }
    }
    .active_item {
      background-color: rgb(228, 57, 60);
      color: white;
    }
  }
}
</style>
