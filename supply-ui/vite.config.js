import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 👈 alias added
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true, // ✅ ensures SPA routing works ("/suppliers", "/approvers", etc.)
  },
})
