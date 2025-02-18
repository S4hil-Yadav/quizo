import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: "dist" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000",
  //       secure: false,
  //     },
  //   },
  // },
});
