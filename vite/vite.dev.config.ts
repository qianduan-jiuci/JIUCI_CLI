import { defineConfig, loadEnv } from "vite"
import { proxySetting } from "./vite.proxy.config"

export default defineConfig({
  server: {
    open: true,
    cors: true,
    hmr: true,
    port: 9002,
    host: "localhost",
    strictPort: false, //当端口占用时，回尝试使用别的可用端口
    proxy: proxySetting(),
  },
})
