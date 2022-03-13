import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { get_local_storage } from '../utils/storage'
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from,next) => {
  const token = get_local_storage('token')
  const name = to.name
  const limit = ['Detail','collection','shopBus']
  if (limit.includes(name) && !token) {
    next({ path: '/login' })
  }
  else next()
})
export default router