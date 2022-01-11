<template>
  <div class="table_wrapper">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goods" label="商品" width="320">
        <template #default="scope">
          <div class="goods_wrapper">
            <img :src="scope.row.goods.img" alt />
            <div>{{ scope.row.goods.des }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价(元)" width="100" />
      <el-table-column prop="count" label="数量" width="100" />
      <el-table-column prop="saled" label="售后" width="100" />
      <el-table-column prop="allPrice" label="实付金额" width="120" />
      <el-table-column prop="status" label="交易状态" width="120" />
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <div class="operation_wrapper">
            <template v-for="item in scope.row.operation">
              <div v-if="item == 'delete'">删除</div>
              <div v-else-if="item == 'check'">查看</div>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Order',
  setup(props) {
    const tableData = [
      {
        goods: {
          img: 'https://s11.mogucdn.com/mlcdn/5abf39/211231_65lk47e3281ei18969g8g5e1a89ki_100x100.jpg_100x100.jpg',
          des: '我gdiwuahdowaihdoiwahoidjwaiojdiowahdfoiwhaiodhjwaiohdoiuwahduiwadwadwadwadwadwadwa',
        },
        price: 180,
        count: 1,
        saled: '暂无售后',
        allPrice: 988,
        status: 0,
        operation: ['delete', 'check']
      },
      {
        goods: {
          img: 'https://s11.mogucdn.com/mlcdn/5abf39/211231_65lk47e3281ei18969g8g5e1a89ki_100x100.jpg_100x100.jpg',
          des: '我gdiwuahdowaihdoiwahoidjwaiojdiowahdfoiwhaiodhjwaiohdoiuwahduiwadwadwadwadwadwadwa',
        },
        price: 180,
        count: 1,
        saled: '暂无售后',
        allPrice: 988,
        status: 0,
        operation: ['delete', 'check']
      }
    ]
    return {
      tableData
    }
  }
}
</script>
<style lang="scss" scoped>
:deep(.has-gutter) {
  tr {
    th {
      background-color: rgba(0, 0, 0, 0.1) !important;
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
      }
    }
  }
}
.table_wrapper {
  margin-top: 30px;
  .goods_wrapper {
    display: flex;
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
}
</style>