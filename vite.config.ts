import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'prod';

export default defineConfig({
  plugins: [react()],
  base: isProduction ? '/calculator/' : '/',
});
