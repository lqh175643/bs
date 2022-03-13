<template>
  <div class="table_wrapper">
    <el-table :data="tableData" style="width: 100%" max-height="700" stripe>
      <el-table-column fixed label="商品信息" width="320">
        <template #default="scope">
          <div v-for="(good, index) in scope.row.goods" :key="index">
            <div class="goods_wrapper" @click="goodClick(scope.row)">
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
          <div
            v-for="(good, index) in scope.row.goods"
            :key="index"
            class="middle"
            @click="commitBtn(good, scope)"
          >
            <div v-if="!good.isComment">评价</div>
            <div v-else>已评价</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogVisible" title="评价" width="30%">
    <span style="font-size: 20px">商品评价</span>
    <img class="commit_img" :src="tempCommit.img" alt="" />
    <Star @changeStar="changeStar" />
    <el-input
      v-model="commitForm.comment"
      :rows="5"
      type="textarea"
      placeholder="最高可获得100校园豆"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="determineCommit">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { formatDate, holdUserInfo } from "../../utils/util";
import { commitOrder } from "../../api/order";
import { useRouter } from "vue-router";

import Star from "../../components/Star.vue";
export default {
  name: "CommitOrder",
  components: {
    Star,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const tableData = computed(() => {
      return store.getters.shopHistory.filter(
        (val) => val.isReceive && val.isPay
      );
    });
    const dialogVisible = ref(false);
    const tempCommit = ref("");
    const commitForm = reactive({
      comment: "",
      score: 0,
      jid: "",
    });
    const commitBtn = (good, scope) => {
      if(good.isComment) return
      dialogVisible.value = true;
      tempCommit.value = good;
      tempCommit.value.did = scope.row.did;
      (commitForm.comment = ""), (commitForm.score = 0), (commitForm.jid = "");
    };
    const changeStar = (e) => {
      commitForm.score = e;
    };
    const determineCommit = () => {
      commitOrder({
        jid: tempCommit.value.jid,
        colName: tempCommit.value.category,
        did: tempCommit.value.did,
        comment: commitForm.comment,
        score: commitForm.score,
      })
        .then(() => {
          holdUserInfo(store);
        })
        .finally(() => {
          dialogVisible.value = false;
        });
    };
    const goodClick = (row) => {
      router.push({
        path: `/detail/${row?.goods[0]?.category}/${row?.goods[0]?.jid}`,
      });
    };
    return {
      tableData,
      formatDate,
      commitBtn,
      dialogVisible,
      determineCommit,
      commitForm,
      tempCommit,
      changeStar,
      goodClick
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  font-size: 20px;
}
.commit_img {
  display: block;
  height: 220px;
}
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