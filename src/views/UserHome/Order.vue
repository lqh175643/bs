<template>
  <div class="table_wrapper">
    <el-table :data="tableData" style="width: 100%" max-height="700" stripe>
      <el-table-column fixed label="商品信息" width="320">
        <template #default="scope">
          <div v-for="(good, index) in scope.row.goods" :key="index">
            <div class="goods_wrapper">
              <img :src="good.img" alt="商品图片" />
              <div>{{ good.des }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价(元)" width="100">
        <template #default="scope">
          <div v-for="(good, index) in scope.row.goods" :key="index">
            <div class="middle">
              <div>{{ good.price }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" width="60">
        <template #default="scope">
          <div v-for="(good, index) in scope.row.goods" :key="index">
            <div class="middle">
              <div>{{ good.count }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="折扣" width="120">
        <template #default="scope">
          <div>{{ "校园豆:￥" + scope.row.campusBean }}</div>
          <div>{{ "优惠券:￥" + (scope.row.coupon.reduce || 0) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="finalPrice" label="实付金额" width="100" />
      <el-table-column prop="did" label="订单号" width="200" />
      <el-table-column prop="generateTime" label="创建时间" width="120">
        <template #default="scope">
          <div class="middle">
            <div>{{ formatDate(scope.row.generateTime) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isPay" label="交易状态" width="100">
        <template #default="scope">
          {{ scope.row.isPay ? "已支付" : "未支付" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operation_wrapper">
            <div @click="orderDelete(scope)">删除</div>
            <!-- <div v-else-if="item == 'check'">查看</div> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" title="确定移除" width="30%">
    <span>是否移除此商品</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="determineDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { useStore } from "vuex";
import { onBeforeMount, computed, ref } from "vue";
import { formatDate, holdUserInfo } from "../../utils/util";
import { deleteUserInfoArr } from "../../api/userHome";
export default {
  name: "Order",
  setup(props) {
    const store = useStore();
    const tableData = computed(() => store.getters.shopHistory);
    const dialogVisible = ref(false);
    const tempDelete = ref("");
    const orderDelete = (scope) => {
      dialogVisible.value = true;
      tempDelete.value = scope.row.did
    };
    const determineDelete = () => {
      deleteUserInfoArr({
        val: { did: tempDelete.value },
        target: "shopHistory",
      }).then(() => {
        holdUserInfo(store);
      }).finally(()=>{
        dialogVisible.value = false;
      });
    };
    return {
      tableData,
      formatDate,
      orderDelete,
      dialogVisible,
      determineDelete,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.has-gutter) {
  tr {
    th {
      // background-color: rgba(0, 0, 0, 0.1) !important;
      .cell {
        font-size: 20px;
      }
    }
  }
}
:deep(tbody) {
  tr {
    td {
      .cell {
        font-size: 18px;
        font-family: simsun;
      }
    }
  }
}
.middle {
  display: flex;
  align-items: center;
  height: 100px;
  font-family: simsun;
}
.table_wrapper {
  margin-top: 30px;
  .goods_wrapper {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      padding: 5px;
    }
    div {
      font-family: simsun;
      height: 100px;
      margin-left: 10px;
      font-size: 16px;
      line-height: 32px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  }
}
</style>