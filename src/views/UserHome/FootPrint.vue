<template>
  <div class="goods">
    <div v-for="(item, index) in tableData" :key="index" class="goods_item">
      <Goods :goodsData="item" />
    </div>
  </div>

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
import { holdUserInfo } from "../../utils/util";

import Goods from "../../components/Goods.vue";
import { deleteUserInfoArr, getShopBus } from "../../api/userHome";
export default {
  name: "FootPrint",
  components: {
    Goods,
  },
  setup(props) {
    let tableData = ref([]);
    let tempDelete = ref("");
    let dialogVisible = ref(false);
    const store = useStore();
    const wrapper_getCollection = (footprint) => {
      tableData.value = [];
      const params = {
        ids: footprint,
      };
      getShopBus(params).then(
        (res) => {
          if (Array.isArray(res) && res.length > 0) {
            tableData.value = res;
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
            await holdUserInfo(store);
            wrapper_getCollection(store.getters.footprint);
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
      wrapper_getCollection(store.getters.footprint);
    });
    return {
      getRowKeys,
      tableData,
      btnDelete,
      shoucangDelete,
      dialogVisible,
    };
  },
};
</script>
<style lang="scss">
.goods {
  display: flex;
  flex-wrap: wrap;
  .goods_item{
    width: 225px;
  }
}
</style>
