import { defineConfig, UserConfig } from "vite"
import viteDevConfig from "./vite/vite.dev.config"
import viteProdConfig from "./vite/vite.prod.config"
import viteCommonConfig from "./vite/vite.common.config"

const mergerOptions = {
  serve: {
    ...viteCommonConfig,
    ...viteDevConfig,
  },
  build: {
    ...viteCommonConfig,
    ...viteProdConfig,
  },
}

const viteOptions = (config: UserConfig, isNeedProxy = false): UserConfig => {
  if (isNeedProxy) return config
  delete config.server?.proxy
  return config
}

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const config = viteOptions(mergerOptions[command])
  return config
})
