import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cesium from "vite-plugin-cesium";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Generate __dirname in ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), cesium()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "cesium": path.resolve(__dirname, "node_modules/cesium"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  optimizeDeps: {
    include: ["cesium"],
  },
  assetsInclude: ["**/*.gltf", "**/*.glb"],
  publicDir: "public",
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
    sourcemap: true, // Ensure source maps are enabled
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.cesium.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
