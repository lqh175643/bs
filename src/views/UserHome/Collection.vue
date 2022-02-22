<template>
  <el-table
    :data="tableData"
    :row-key="getRowKeys"
  >
    <el-table-column
      type="selection"
      :reserve-selection="true"
      row-key="jid"
      width="55"
    />
    <el-table-column label="商品" width="600">
      <template #default="scope">
        <div class="goods_wrapper">
          <img :src="scope.row.goods.img" alt />
          <div>{{ scope.row.goods.des }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="单价(元)" width="120" />
    <el-table-column prop="operation" label="操作">
      <template #default="scope">
        <div class="operation_wrapper">
          <template v-for="item in scope.row.operation">
            <div v-if="item == 'delete'" @click="btnDelete(scope.row)">删除</div>
            <div v-else-if="item == 'check'">查看</div>
          </template>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="确定移除" width="30%">
    <span>是否移除此商品</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="shoucangDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { holdUserInfo } from '../../utils/util'
import { deleteUserInfoArr, getShopBus } from "../../api/userHome";
export default {
  name: "Collection",
  setup(props) {
    let tableData = ref([]);
    let tempDelete = ref("");
    let dialogVisible = ref(false);
    const store = useStore();
    const wrapper_getCollection = (collection) => {
      tableData.value = [];
      const params = {
        ids: JSON.stringify(collection),
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
                operation: ["delete"],
              });
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    };
    const getRowKeys = (row) => {
      return row.jid;
    };
    const btnDelete = (row) => {
      dialogVisible.value = true;
      tempDelete.value = row.jid;
    };
    const shoucangDelete = () => {
      deleteUserInfoArr({ val: tempDelete.value, target: "collect" })
        .then(
          async (res) => {
            ElMessage({
              message: "删除成功",
              type: "success",
              offset: 60,
            });
            await holdUserInfo(store)
            wrapper_getCollection(store.getters.collection)
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
    onBeforeMount(() => {
      wrapper_getCollection(store.getters.collection);
    });
    return {
      getRowKeys,
      tableData,
      btnDelete,
      shoucangDelete,
      dialogVisible
    };
  },
};
</script>
<style lang="scss">
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
</style>
