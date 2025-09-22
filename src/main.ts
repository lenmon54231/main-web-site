import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes as autoRoutes } from 'vue-router/auto-routes' // 虚拟模块

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(autoRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)
app.use(router)

const modules = import.meta.glob<{ install: (ctx: any) => void }>('./modules/*.ts', { eager: true })
Object.values(modules).forEach(i => i.install?.({ app, router, routes, isClient: true }))

router.isReady().then(() => {
  app.mount('#app')
})
