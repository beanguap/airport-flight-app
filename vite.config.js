import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    wasm()
  ],
  server: {
    mimeTypes: {
      'text/javascript': ['.js', '.worker.js'],
      'application/wasm': ['.wasm']
    }
  },
  build: {
    rollupOptions: {
      // Cesium has some specific needs for bundling
      external: ['cesium'],
      output: {
        // Cesium needs to reference its assets correctly
        globals: {
          cesium: 'Cesium'
        }
      }
    },
    // Ensure the Cesium assets are handled correctly
    assetsInlineLimit: 0
  },
  resolve: {
  },
  optimizeDeps: {
    include: [
      'cesium'
    ]
  }
});
