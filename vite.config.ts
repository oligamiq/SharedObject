// https://zenn.dev/seapolis/articles/3605c4befc8465

import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import swc from "unplugin-swc";

export default defineConfig({
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: resolve(__dirname, "lib/index.ts"),
      name: "SharedObject",
      fileName: (_) => "index.js",
    },
    sourcemap: false,
    minify: true,
    copyPublicDir: false,
  },
  plugins: [swc.vite(), swc.rollup(), dts({ rollupTypes: true })],
});
