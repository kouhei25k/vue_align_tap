import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Base from '../views/Base.vue'
import Processed from '../views/Processed.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/base',
    name: 'Base',
    component: Base
  },
  {
    path: '/processed',
    name: 'Processed',
    component: Processed
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
