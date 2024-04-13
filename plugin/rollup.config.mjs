import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import externalGlobals from "rollup-plugin-external-globals";
import terser from "@rollup/plugin-terser";
import path from "node:path";

/**
 * Silence circular dependency warnings for specific packages
 * https://github.com/rollup/rollup/issues/1089#issuecomment-402109607
 *
 * @param {import("rollup").RollupLog} warning
 * @returns
 */
const onwarn = (warning) => {
  if (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.message.includes("node_modules/@melt-ui")
  )
    return;

  console.warn(`(!) ${warning.message}`);
};

/** @type {import("rollup").RollupOptions} */
export default {
  input: "./src/plugin/index.ts",
  output: {
    file: `./dist/plugin.js`,
    format: "esm",
    exports: "named",
  },
  onwarn,
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
        hydratable: true,
      },
    }),
    commonjs(),
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
    terser({
      mangle: {
        reserved: ["id", "name", "version", "author"],
      },
    }),
  ],
};
