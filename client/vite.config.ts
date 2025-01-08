import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to /hikes to your backend server
      '/api': {
        target: 'http://localhost:5000', // The URL of your backend
        // changeOrigin: true, // For virtual hosted sites
        secure: false, // Set to true if you're using HTTPS
      },
    },
  },
})
