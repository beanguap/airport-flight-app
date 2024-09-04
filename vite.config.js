import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import path from 'path';  // Ensure path is imported correctly
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
      external: ['cesium'],
      output: {
        globals: {
          cesium: 'Cesium'
        }
      }
    },
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      '@cesium': path.resolve(__dirname, 'node_modules/cesium')
    }
  },
  optimizeDeps: {
    exclude: [
      'cesium',
    ]
  }
});
