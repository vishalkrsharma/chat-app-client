import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/': {
        target: import.meta.env.VITE_SERVER_URL,
        changeOrigin: true,
      },
    },
  },
});
