import { defineConfig } from 'vite';

export default defineConfig({
  // No WASM plugins needed here for pre-compiled static files!
  optimizeDeps: {
    exclude: ['@pybricks/mpy-cross-v6']
  },
  server: {
    fs: {
      strict: false 
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  }
});