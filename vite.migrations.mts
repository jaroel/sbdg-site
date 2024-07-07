import { resolve } from "node:path";
import { nodeExternals } from "rollup-plugin-node-externals";
import { type PluginOption, defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      ...nodeExternals(),
      name: "node-externals",
      enforce: "pre",
      apply: "build",
    } as PluginOption,
  ],
  build: {
    outDir: resolve(__dirname, "dist", "db"),
    lib: {
      entry: resolve(__dirname, "src/db/dbScript.ts"),
      formats: ["es"],
      fileName: "dbScript",
    },
    rollupOptions: {
      external: ["orchid-orm"],
      output: {
        entryFileNames: "[name].mjs",
        chunkFileNames: "[name].[hash].mjs",
      },
    },
  },
});
