import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
const { resolve } = require('path')
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
  resolve: {
    alias: [//配置别名
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  },
  server: {
    host: true,
    port: 8080,
    strictPort: false
  },
  build: {
    target: 'es2020'
  }
})