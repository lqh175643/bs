<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    :row-key="getRowKeys"
    @select-all="handleSelectionChange"
    @select="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      :reserve-selection="true"
      row-key="jid"
      width="55"
    />
    <el-table-column label="商品" width="450">
      <template #default="scope">
        <div class="goods_wrapper">
          <img :src="scope.row.goods.img" alt />
          <div>{{ scope.row.goods.des }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="单价(元)" width="120" />
    <el-table-column prop="count" label="数量" width="150">
      <template #default="scope">
        <div class="count_wrapper">
          <el-input-number
            v-model="scope.row.count"
            :min="1"
            :max="100"
            size="small"
            @change="handleNumChange"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="curprice" label="小计(元)" width="120">
      <template #default="scope">
        <div class="operation_wrapper">
          {{ (scope.row.count * scope.row.price).toFixed(2) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default="scope">
        <div class="operation_wrapper">
          <div v-for="(item, index) in scope.row.operation" :key="index">
            <div v-if="item == 'delete'" @click="btnDelete(scope.row)">
              删除
            </div>
            <div v-else-if="item == 'check'">查看</div>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="bottom_bar">
    <span class="margin_right_10" @click="handtoggleAllSelection">全选</span>
    <span class="margin_right_10" @click="toggleSelection()">取消选项</span>
    <span @click="moveToCol">移入收藏夹</span>
    <span class="totle_count">
      共有
      <i>{{ totleCount }}</i> 件商品
    </span>
    <span class="totle_price">
      总计
      <i>{{ totlePrice }}</i>
    </span>
    <span class="go_pay" @click="buyBtn">去支付</span>
  </div>
  <el-dialog v-model="dialogVisible" title="确定移除" width="30%">
    <span>是否移除此商品</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="shopBusDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <Shoping
    :dialogTableVisible="dialogTableVisible"
    v-if="dialogTableVisible"
    :buyData="buyData"
    @myrefresh="myrefresh"
    @shopClose="dialogTableVisible = false"
  />
</template>
<script>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { onBeforeMount } from "vue";

import Shoping from "../../components/Shoping.vue";
import { getShopBus, deleteUserInfo } from "../../api/userHome";
import { holdUserInfo } from "../../utils/util";

export default {
  name: "ShopBus",
  components: {
    Shoping,
  },
  setup(props) {
    const store = useStore();
    const multipleTableRef = ref();
    let totleCount = ref("0");
    let totlePrice = ref("0.00");
    let tableData = ref([]);
    let dialogVisible = ref(false);
    let dialogTableVisible = ref(false);
    let tempDelete = ref("");
    let tempRows = [];
    const buyData = ref([]);
    const buyBtn = () => {
      if (buyData.value.length <= 0) {
        ElMessage({
          message: "至少选择一种商品",
          type: "warning",
          offset: 60,
        });
        return;
      }
      dialogTableVisible.value = true;
    };
    const handleSelectionChange = (val) => {
      console.log(123459)
      tempRows = val;
      let count = 0;
      let price = 0;
      let len = buyData.value.length;
      val.forEach((item) => {
        count += item.count;
        price += item.count * item.price;
      });
      totleCount.value = count;
      totlePrice.value = price.toFixed(2);

      buyData.value.splice(0, len);
      val.forEach((item) => {
        buyData.value.push({
          jid: item.jid,
          img: item.goods.img,
          des: item.goods.des,
          price: item.price,
          count: computed(() => item.count),
        });
      });
    };
    const handtoggleAllSelection = (val) => {
      multipleTableRef.value.toggleAllSelection();
    };
    const toggleSelection = (rows) => {
      if (rows) {
        rows.forEach((row) => {
          multipleTableRef.value.toggleRowSelection(row, undefined);
        });
      } else {
        multipleTableRef.value.clearSelection();
      }
    };
    const handleNumChange = (e) => {
      // handleSelectionChange(tempRows)
      let count = 0;
      let price = 0;
      tempRows.forEach((item) => {
        count += item.count;
        price += item.count * item.price;
      });
      totleCount.value = count;
      totlePrice.value = price.toFixed(2);
    };
    const moveToCol = () => {
      ElMessage({
        message: "收藏成功",
        type: "success",
        offset: 60,
      });
    };
    const getRowKeys = (row) => {
      return row.jid;
    };
    const shopBusDelete = () => {
      deleteUserInfo({ jid: tempDelete.value, target: "shopBus" })
        .then(
          async (res) => {
            ElMessage({
              message: "删除成功",
              type: "success",
              offset: 60,
            });
            await holdUserInfo(store);
            wrapper_getShopBus(store.getters.shopBus);
          },
          (err) => {
            ElMessage({
              message: "删除失败",
              type: "error",
              offset: 60,
            });
          }
        )
        .finally(() => {
          dialogVisible.value = false;
        });
    };
    const btnDelete = (row) => {
      dialogVisible.value = true;
      tempDelete.value = row.jid;
    };
    const wrapper_getShopBus = (shopBus) => {
      tableData.value = [];
      const params = {
        ids: JSON.stringify(Object.keys(shopBus)),
      };
      getShopBus(params).then(
        (res) => {
          if (Array.isArray(res) && res.length > 0) {
            res.forEach((val, index) => {
              tableData.value.push({
                goods: {
                  img: val.imgUrl,
                  des: val.detail,
                },
                jid: val.id,
                price: val.price.split("￥")[1],
                count: 1,
                operation: ["delete"],
                curprice: 0,
              });
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };
    onBeforeMount(() => {
      wrapper_getShopBus(store.getters.shopBus);
    });
    const myrefresh = async ()=>{
      multipleTableRef.value.clearSelection()
      await holdUserInfo(store)
      wrapper_getShopBus(store.getters.shopBus);
    }

    return {
      multipleTableRef,
      handleSelectionChange,
      toggleSelection,
      handtoggleAllSelection,
      handleNumChange,
      moveToCol,
      tableData,
      totleCount,
      totlePrice,
      getRowKeys,
      shopBusDelete,
      dialogVisible,
      btnDelete,
      buyBtn,
      buyData,
      dialogTableVisible,
      myrefresh
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-input-number--small) {
  width: 105px;
}
.goods_wrapper {
  display: flex;
  padding-right: 60px;
  // height: 100px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }
  div {
    height: 100px;
    margin-left: 10px;
    font-size: 20px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
.bottom_bar {
  position: relative;
  padding: 20px;
  margin-top: 20px;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  cursor: pointer;
  i {
    color: deeppink;
    font-size: 18px;
  }
  .totle_count {
    position: absolute;
    right: 300px;
  }
  .totle_price {
    position: absolute;
    right: 200px;
  }
  .go_pay {
    display: inline-block;
    font-size: 25px;
    height: 100%;
    width: 150px;
    background-color: deeppink;
    color: white;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    line-height: 60px;
  }
}
</style>
