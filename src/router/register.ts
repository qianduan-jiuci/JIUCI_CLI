import { RouteRecordRaw } from "vue-router"
import { routes as baseRoutes } from "./routes"

const getModules = () => {
  const pages = import.meta.glob("@pages/**/page.ts", {
    eager: true,
    import: "default",
  })
  // 获取vue文件的依赖关系
  const components = import.meta.glob("@pages/**/*.vue", {
    eager: true,
    import: "default",
  })
  return {
    pages,
    components,
  }
}

/*
/src/pages/user/profile                     /src/pages/user/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
*/

/*
 {page: '/user', component: () => import("@pages/user"), children: [
  {page: 'profile', component: () => import("@pages/user/profile")},
  {page: 'posts', component: () => import("@pages/user/posts")}
 ]}
*/

/**
 * @description 根据src/pages目录, 自动生成路由
 * @returns {RouteRecordRaw[]}
 */
const recordLayoutRoutes = () => {
  // 获取所有的page.ts中的meta
  const { pages, components } = getModules()
  // 批量生成路由信息
  const routes = Object.entries(pages).map(([route, meta]) => {
    const basePage = route.replace("/src/pages", "").replace("/page.ts", "")
    const page = basePage || "/"
    const name = route.split("/").filter(Boolean).join("-") || "index"
    const component = route.replace("/page.ts", `${basePage || "/index"}.vue`)
    return {
      path: page,
      name,
      component: components[component],
      meta: meta,
    }
  })
  return [...baseRoutes, ...routes] as RouteRecordRaw[]
}

export { recordLayoutRoutes }
