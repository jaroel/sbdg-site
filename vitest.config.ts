import { imagetools } from "vite-imagetools";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), solid(), imagetools()],
  resolve: {
    conditions: ["development", "browser"],
    preserveSymlinks: true,
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["json", "html"],
    },
  },
});
