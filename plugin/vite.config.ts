import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import externalGlobals from "rollup-plugin-external-globals";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    minify: false,
    rollupOptions: {
      plugins: [
        externalGlobals({
          "solid-js": "solidjs",
          "solid-js/web": "solidjsWeb",
        }),
        terser({
          
          mangle: {
            reserved: ["id", "label", "author", "version", "components"],
          },
        }),
      ],
    },
    lib: {
      entry: "./src/plugin/index.ts",
      fileName: "plugin",
      formats: ["es"],
    },
  },
});
