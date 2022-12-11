import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  build: {
    outDir: './../docs/', // ビルド成果物の生成先
    rollupOptions: {
      output: { // entry chunk assets それぞれの書き出し名の指定
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    }
  },
})
