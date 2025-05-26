import { createRouter, createWebHistory } from 'vue-router'
import DashboardRoutes from '@/modules/dashboard/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...DashboardRoutes],
})

export default router
