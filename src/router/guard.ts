import { Router, RouteLocationNormalized, NavigationGuardNext } from "vue-router"

const routerGuard = (router: Router) => {
  router.beforeEach((_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    next()
  })
}

export { routerGuard }
