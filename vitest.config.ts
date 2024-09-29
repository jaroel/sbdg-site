import { imagetools } from "vite-imagetools";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solid(), imagetools()],
  resolve: {
    conditions: ["development", "browser"],
    preserveSymlinks: true,
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["json", "html"],
    },
    alias: {
      "~/": new URL("./src/", import.meta.url).pathname,
    },
  },
});
