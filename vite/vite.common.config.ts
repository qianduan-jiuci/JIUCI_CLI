import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { viteMockServe } from "vite-plugin-mock"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/plugins/mock",
      watchFiles: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  publicDir: "./public",
  envDir: "./env",
  // css配置相关
  css: {
    preprocessorOptions: {},
  },
  // 依赖于构建选项
  optimizeDeps: {},
  // 解析编译相关
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@coms": path.resolve(__dirname, "../src/components"),
      "@compos": path.resolve(__dirname, "..../src/composables"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@plugins": path.resolve(__dirname, "../src/plugins"),
    },
  },
})
