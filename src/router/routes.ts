import type { RouteRecordRaw } from "vue-router"

export const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/notFound",
  },
] as RouteRecordRaw[]
