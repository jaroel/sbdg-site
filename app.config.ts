import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  vite: {
    plugins: [imagetools(), tailwindcss()],
    build: {
      reportCompressedSize: false,
    },
  },
  server: {
    preset: "node-server",
  },
  middleware: "./src/middleware.ts",
});
