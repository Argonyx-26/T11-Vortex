import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Allows opening dist/index.html directly via file:// protocol offline
  server: {
    port: 5173,
    host: true
  }
})
