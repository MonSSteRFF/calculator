import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  switch (mode) {
    case 'static': {
      return {
        plugins: [react()],
        base: '/',
      };
    }
    case 'deploy': {
      return {
        plugins: [react()],
        base: '/calculator/',
      };
    }
    default: {
      return {
        plugins: [react()],
      };
    }
  }
});
