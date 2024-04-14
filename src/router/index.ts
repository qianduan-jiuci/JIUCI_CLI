import { createRouter, createWebHistory } from "vue-router"
import { recordLayoutRoutes } from "./register"
import { routerGuard } from "./guard"
import type { App } from "vue"

const router = createRouter({
  history: createWebHistory(),
  routes: recordLayoutRoutes(),
})

export const setupRouter = (app: App) => {
  app.use(router)
}

routerGuard(router)

export default router
