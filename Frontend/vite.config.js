import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MemeVest/', // Ensure this matches your repo name
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensures single bundle for assets
      },
    },
  },
});
