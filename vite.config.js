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
      'application/javascript': ['js', 'mjs', 'worker.js'],
      'application/wasm': ['wasm'],
      'model/gltf+json': ['gltf', 'json']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['cesium']
        }
      }
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    sourcemap: 'inline' // Enable inline source maps
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'cesium': path.resolve(__dirname, 'node_modules/cesium')
    }
  },
  optimizeDeps: {
    include: ['cesium']
  },
  assetsInclude: ['**/*.gltf', '**/*.glb'], // Add this line
  publicDir: 'public', // Add this line if your assets are in a 'public' directory
});