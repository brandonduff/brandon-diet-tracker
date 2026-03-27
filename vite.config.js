import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  base: '/brandon-diet-tracker/',
  resolve: {
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.js', 'src/test/steps/*.steps.js'],
    alias: {
      // Force Svelte to use browser bundle in tests
      'svelte': 'svelte',
    },
  },
})
