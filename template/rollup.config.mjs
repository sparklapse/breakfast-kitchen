import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import externalGlobals from "rollup-plugin-external-globals";
import terser from "@rollup/plugin-terser";
import path from "node:path";

/** @type {import("rollup").RollupOptions} */
export default {
  input: "./src/plugin/index.ts",
  output: {
    file: `./dist/plugin.js`,
    format: "esm",
    exports: "named",
  },
  plugins: [
    {
      name: "prevent-bad-imports",
      transform: (code, id) => {
        if (!id.includes(path.resolve("./src/plugin"))) return;
        if (/['"]@sparklapse\/breakfast['"]/gm.test(code))
          throw Error('Use "@sparklapse/breakfast/plugin" instead.');
        return null;
      },
    },
    typescript({
      sourceMap: false,
    }),
    svelte({
      preprocess: [preprocess()],
      emitCss: false,
      compilerOptions: {
        discloseVersion: false,
        css: "injected",
      },
    }),
    resolve({
      browser: true,
      exportConditions: ["svelte"],
      extensions: [".svelte", ".js", ".ts"],
    }),
    externalGlobals({
      svelte: "svelte",
      "svelte/animate": "svelteAnimate",
      "svelte/easing": "svelteEasing",
      "svelte/internal": "svelteInternal",
      "svelte/motion": "svelteMotion",
      "svelte/store": "svelteStore",
      "svelte/transition": "svelteTransition",
    }),
    terser(),
  ],
};
