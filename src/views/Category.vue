<template>
  <CategoryBar @barChange="barChange" />
  <div class="goods" @click="goToDetail">
    <div v-for="(item, index) in goodsDatas" :key="index" class="goods_item">
      <Goods :goodsData="item" />
    </div>
  </div>
  <div class="block">
    <el-pagination
      v-model:currentPage="query.page"
      v-model:page-size="currentSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      :page-sizes="[10, 20, 30, 50, 100]"
      :default-page-size="30"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { getCategoryData } from "../api/home";
import { onBeforeMount, ref, reactive,computed } from "vue";

import CategoryBar from "../components/CategoryBar.vue";
import Goods from "../components/Goods.vue";
import { useRouter } from "vue-router";

export default {
  name: "Detail",
  components: {
    CategoryBar,
    Goods,
  },
  props: {
    category: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const query = reactive({
      page: 1,
      limit: 30,
    });
    const goodsDatas = ref([]);
    let url = window.location.href.split("?")[0].split("/").pop();
    const totalCount = ref(0);
    const currentPage = ref(1);
    const router = useRouter();
    const currentSize = ref(30)
    const handleSizeChange = function (e) {
      currentSize.value = e
      query.limit = e;
      query.page = 1;
      getData(url, query);
      goTop();
    };
    const handleCurrentChange = function (e) {
      query.page = e;
      getData(url, query);
      goTop();
    };
    const barChange = function (e) {
      query.searchLimit = e;
      getData(url, query);
    };
    function getData(url, query) {
      getCategoryData(url, query)
        .then((res) => {
          totalCount.value = Number(res.totalCount);
          goodsDatas.value = res.data;
        })
        .catch((err) => {
          throw err
        });
    }
    function goTop() {
      let timer = null;
      timer = setInterval(() => {
        document.documentElement.scrollTop -= 500;
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, 50);
    }
    const goToDetail = function (e) {
      let category = router.currentRoute.value.params.url;
      router.push({
        path: `/detail/${category}/${e.target.dataset.id}`,
      });
    };
    onBeforeMount(() => {
      getCategoryData(url, query)
        .then((res) => {
          totalCount.value = Number(res.totalCount);
          goodsDatas.value = res.data;
        })
        .catch((err) => {
          throw err
        });
    });
    return {
      totalCount,
      currentPage,
      handleSizeChange,
      currentSize,
      handleCurrentChange,
      goodsDatas,
      barChange,
      query,
      goToDetail,
    };
  },
};
</script>
<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .goods_item {
    display: flex;
    justify-content: center;
    width: 25%;
  }
}
.block {
  margin: 50px 0;
  display: flex;
  justify-content: flex-end;
}
</style>