<template>
  <div class="categorybar">
    <template v-for="(value,key,index) in config" :key="index">
      <div class="wrapper">
        <div class="parent">{{ key }}</div>
        <div class="son">
          <template v-for="item in value" :key="item">
            <span
              :class="['son_item', checked.has(item) ? 'checked' : '']"
              :data-index="index"
              @click="search"
            >{{ item }}</span>
          </template>
          <div v-if="Object.keys(config).length - 1 !== index" class="hr"></div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'Category',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          '品牌': ['良品铺子', '三只松鼠', '百草味'],
          '零食类型': ['休闲零食', '肉干肉脯', '饼干蛋糕', '坚果炒货', '蜜饯果干', '巧克力'],
        }
      }
    }
  },
  setup(props, { emit }) {
    let checked = ref(new Set())
    let obj = {}
    let search = function (e) {
      let flag = e.target.dataset.index
      const current = e.target.innerText
      if (!obj[flag]) obj[flag] = new Set()
      if(obj[flag].has(current)){
        obj[flag].delete(current)
      }else{
        obj[flag].add(current)
      }
      let payload = []
      for (let key in obj) {
        payload.push([...obj[key]].join('|'))
      }
      payload = payload.map(val => {
        if(val) return '(?=.*?'+'('+val+')'+')'
      }).join('')
      if (checked.value.has(current)) {
        checked.value.delete(current)
      } else {
        checked.value.add(current)
      }
      emit('barChange', payload)
    }
    return {
      search,
      checked
    }
  }
}
</script>
<style lang="scss" scoped>
.categorybar {
  width: 100%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.wrapper {
  width: 950px;
  height: 50px;
  display: flex;
  align-items: center;
  .parent {
    display: flex;
    align-items: center;
    width: 100px;
    background-color: rgb(243, 243, 243);
    height: 100%;
    padding-left: 25px;
  }
  .son {
    padding-left: 15px;
    background-color: rgb(250, 250, 250);
    height: 100%;
    width: 100%;
    .hr {
      width: 96%;
      height: 2px;
      margin-top: 13px;
      background-color: rgb(243, 243, 243);
    }
    .son_item {
      margin-right: 30px;
      vertical-align: -16px;
      height: 100%;
      cursor: pointer;
      font-size: 14px;
      border-radius: 5px;
      padding: 5px;
    }
  }
}
.checked {
  border: 2px solid rgb(188, 223, 180);
}
</style>