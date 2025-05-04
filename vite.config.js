import { defineConfig } from 'vite';
import { webcrypto } from 'crypto';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// Ensure globalThis.crypto is set for environments like GitHub Actions
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

export default defineConfig({
  base: './', // Useful for GitHub Pages or static hosting
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
