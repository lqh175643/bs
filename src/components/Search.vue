<template>
  <el-input
    v-model="input"
    placeholder="零食大礼包"
    :style="{ width: width + 'px' }"
  >
    <template #append>
      <i class="iconfont icon-search" @click="search"></i>
    </template>
  </el-input>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Search",
  props: {
    width: {
      type: Number,
      default: 400,
    },
  },
  setup() {
    const input = ref("");
    const route = useRouter()
    const search = () => {
      if(!input.value) return 
      route.push({
        path: `/Category/${input.value || ''}`,
        query: {
          page: 1,
          limit: 30,
        },
      });
    };
    return {
      input,
      search,
    };
  },
};
</script>