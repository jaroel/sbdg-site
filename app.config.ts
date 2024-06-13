import { defineConfig } from "@solidjs/start/config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  vite: {
    plugins: [imagetools()],
    build: {
      reportCompressedSize: false,
    },
  },
  server: {
    preset: "bun",
  },
});
