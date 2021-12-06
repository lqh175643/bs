<template>
  <div>
    <span>{{comText}}</span>
  </div>
</template>
<script>
import { computed } from "vue"
export default {
  name:'TextHide',
  props:{
    text:{
      type:String,
      default:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
    },
    count:{
      type:Number,
      default:25
    }
  },
  setup(props) {
    const comText = computed(()=>{
      return props.text.substring(0,props.count)+'...'
    })
    return {
      comText
    }
  }
}
</script>