import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  // 引入第三方的配置
  optimizeDeps: {
    include: ["axios"]
  },
  // 代理请求
  server:{
    proxy: { 
      '/api': {
       target: "http://192.168.0.60:1314",
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
