import { defineConfig } from 'vite';
import rollupNodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  base: './',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyfills()],
    },
  },
});
