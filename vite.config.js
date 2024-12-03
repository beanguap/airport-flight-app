import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cesium from "vite-plugin-cesium";
import path from "path";

export default defineConfig({
  plugins: [react(), cesium()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      cesium: path.resolve(__dirname, "node_modules/cesium"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure .jsx is included
  },
  optimizeDeps: {
    include: ["cesium"],
  },
  assetsInclude: ["**/*.gltf", "**/*.glb"], // Include GLTF and GLB assets
  publicDir: "public", // Ensure public directory is set
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ["cesium"],
        },
      },
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    sourcemap: true, // Use external source maps
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.cesium.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});