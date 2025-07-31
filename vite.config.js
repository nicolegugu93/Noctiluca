// vitest.config.js
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  // Configuración existente para desarrollo
  server: {
    port: 5173, // o el puerto que uses
  },
  // Agregar configuración de testing
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})