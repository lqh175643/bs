import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
const vueI18nPlugin = {
  name: 'vue-i18n',
  transform(code, id) {
    if (!/vue&type=i18n/.test(id)) {
      return
    }
    if (/\.ya?ml$/.test(id)) {
      code = JSON.stringify(require('js-yaml').load(code.trim()))
    }
    return `export default Comp => {
      Comp.i18n = ${code}
    }`
  }
}
export default defineConfig({
  plugins: [vue(), vueI18nPlugin],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/mixin.scss";`,
      }
    }
  },
  base: '/bs',
  server: {
    host: true,
    port: 8080,
    strictPort: false,
    proxy: {
      '/lqh175643.github.io':{
        target: 'https://lqh175643.github.io/bs/assets/',
        changeOrigin: true
      }
    }
  }
})