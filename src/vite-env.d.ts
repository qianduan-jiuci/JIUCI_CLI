/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL_API: string
  readonly VITE_BASE_DOMIN: string
  readonly VITE_TIMEOUT: number
  readonly VITE_BASE_URL_ASSETS: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
