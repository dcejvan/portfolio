// setup.mjs
import { build } from 'vite';

// If running in a Node 20+ environment, --experimental-global-webcrypto ensures this exists already
await build();
