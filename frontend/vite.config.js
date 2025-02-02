import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Asegurar que el frontend use el puerto correcto
    open: true,
  }, 
});
