import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  switch (mode) {
    case 'build': {
      return {
        plugins: [react()],
        base: '/',
      };
    }
    case 'prod': {
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
