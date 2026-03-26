import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/brandon-diet-tracker/',
  test: {
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
  },
})
