import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ["lodash"],
          vender: ["vue", "vue-router", "@vueuse/core", "pinia", "element-plus"],
        },
        chunkFileNames: "[name]-[hash][extname]",
        entryFileNames: "[name]-[hash][extname]",
        assetFileNames(chunkInfo) {
          if (chunkInfo.name?.endsWith("css")) {
            return "css/[name]-[hash][extname]"
          }
          const imageExt = [".jpg", ".png", ".webp", ".ico", ".gif", ".jpeg"]
          if (imageExt.some((ext) => chunkInfo.name?.endsWith(ext))) {
            return "images/[name]-[hash][extname]"
          }
          const steamExt = [".mp4", ".mp3", ".mkv"]
          if (steamExt.some((ext) => chunkInfo.name?.endsWith(ext))) {
            return "video/[name]-[hash][extname]"
          }
          return "assets/[name]-[hash][extname]"
        },
      },
    },
  },
})
