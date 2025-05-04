// setup.mjs
import { webcrypto } from 'crypto';

// Set global crypto for Node environments like CI
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}

// Dynamically import and run Vite build
import('vite').then(vite => vite.build());
