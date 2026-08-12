import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Projects-portfolio-ps/',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: true
  }
});
