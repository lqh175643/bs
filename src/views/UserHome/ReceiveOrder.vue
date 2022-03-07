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
      <el-table-column prop="count" label="数量" width="60">
        <template #default="scope">
          <div v-for="(good, index) in scope.row.goods" :key="index">
            <div class="middle">
              <div>{{ good.count }}</div>
            </div>
          </div>
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
      <el-table-column label="操作">
        <template #default="scope">
          <div class="operation_wrapper">
            <div v-if="!scope.row.isReceive" @click="receiveBtn(scope)">
              确定收货
            </div>
            <div v-else>已收货</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" title="确定收货" width="30%">
    <span>是否确定收货</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="determineReceive">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { formatDate, holdUserInfo } from "../../utils/util";
import { receiveOrder } from "../../api/order";
export default {
  name: "Order",
  setup(props) {
    const store = useStore();
    const tableData = computed(() => {
      return store.getters.shopHistory.filter(val=>val.isReceive==false);
    });
    const dialogVisible = ref(false);
    const tempDelete = ref("");
    const receiveBtn = (scope) => {
      dialogVisible.value = true;
      tempDelete.value = scope.row.did;
    };
    const determineReceive = () => {
      receiveOrder({
        did: tempDelete.value,
      })
        .then(() => {
          holdUserInfo(store);
        })
        .finally(() => {
          dialogVisible.value = false;
        });
    };
    return {
      tableData,
      formatDate,
      receiveBtn,
      dialogVisible,
      determineReceive,
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
.operation_wrapper {
  cursor: pointer;
}
</style>