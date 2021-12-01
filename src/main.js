import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/icon.css'
import './assets/index.css'
import './utils/init.js'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.mount('#app')

