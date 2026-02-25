import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,        // ✅ your original port
    host: true,        // ✅ your original host
    hmr: {
      overlay: false,  // ✅ from lovable
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ allows "@/components/..."
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },

  optimizeDeps: {
    force: true,
  },
}));