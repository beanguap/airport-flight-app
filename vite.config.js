import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import cesium from 'vite-plugin-cesium';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    cesium()
  ],
  server: {
    mimeTypes: {
      'text/javascript': ['.js', '.worker.js'],
      'application/wasm': ['.wasm']
    }
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      '@cesium/engine': path.resolve(__dirname, 'node_modules/@cesium/engine')
    }
  },
  optimizeDeps: {
    exclude: [
      '@cesium/engine'
    ]
  }
});
