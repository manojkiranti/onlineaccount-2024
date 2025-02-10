import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "./build",
    assetsDir: "static",
    emptyOutDir: true,
    sourcemap: true,
    target: "esnext",
  },
});
