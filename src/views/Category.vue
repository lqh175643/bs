<template>
  <div>
    <div class="block">
      <el-pagination
        v-model:currentPage="currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :page-sizes="[10, 20, 30, 50, 100]"
        :default-page-size="30"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getCategoryData } from "../api/home"
import { onBeforeMount, ref, reactive } from "vue"
export default {
  name: 'Detail',
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    let query = reactive({
      page: 1,
      limit: 30
    })
    let url = window.location.href.split('?')[0].split('/').pop()
    let totalCount = ref(null)
    let currentPage = ref(1)
    const handleSizeChange = function (e) {
      query.limit = e
      getCategoryData(url, query).then(res => {
        console.log(res)
        totalCount.value = res.totalCount
      }).catch(err => {
        console.log(err)
      })
    }
    const handleCurrentChange = function (e) {
      query.page = e
      getCategoryData(url, query).then(res => {
        console.log(res)
        totalCount.value = res.totalCount
      }).catch(err => {
        console.log(err)
      })
    }
    onBeforeMount(() => {
      getCategoryData(url, query).then(res => {
        console.log(res)
        totalCount.value = res.totalCount
      }).catch(err => {
        console.log(err)
      })
    })
    return {
      totalCount,
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>
<style lang="sass" scoped>

</style>