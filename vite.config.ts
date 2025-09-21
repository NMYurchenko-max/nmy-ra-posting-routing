import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Для GitHub Pages (project pages) база должна совпадать с именем репозитория
  base: mode === 'production' ? '/nmy-ra-posting-routing/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/data': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
      '/error': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
      '/loading': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
      '/posts': {
        target: 'http://localhost:7070',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    // ESM-совместимый способ указать путь к src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
