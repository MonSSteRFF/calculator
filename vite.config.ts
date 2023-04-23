import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  console.log(mode);

  switch (mode) {
    case 'static': {
      return {
        plugins: [react()],
        base: '/',
      };
    }
    case 'deploy': {
      console.log('PROD PROD PROD');
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
