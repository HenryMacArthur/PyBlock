import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PyBlock/',
  optimizeDeps: {
    include: ['blockly']
  },
  server: {
    fs: {
      strict: false
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  build: {
    commonjsOptions: {
      include: [/blockly/, /node_modules/],
    },
  },
});

