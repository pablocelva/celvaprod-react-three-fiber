import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'router': ['react-router-dom'],
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
})
