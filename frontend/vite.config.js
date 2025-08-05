import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      path: "path-browserify",
      url: "url",
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['path-browserify', 'url']
  },
  server: {
    fs: {
      strict: false
    }
  },

})

