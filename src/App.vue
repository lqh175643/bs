<template>
<router-view></router-view>
  <!-- <Home /> -->
</template>

<script>
import Home from './views/Home.vue'
console.log(12345)

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
