import { babel } from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import externalGlobals from "rollup-plugin-external-globals";

const EXTENSIONS = [".js", ".ts", ".jsx", ".tsx"];

/**
 * 1.
 * Silence circular dependency warnings for specific packages
 * https://github.com/rollup/rollup/issues/1089#issuecomment-402109607
 *
 * 2.
 * Silence a solid import warning that never actually is imported
 *
 * @param {import("rollup").RollupLog} warning
 * @returns
 */
const onwarn = (warning) => {
  // 1
  if (
    warning.code === "CIRCULAR_DEPENDENCY" &&
    warning.message.includes("node_modules")
  )
    return;

  // 2
  if (
    warning.message.includes(
      `"memo" is imported from external module "solid-js/web" but never used in`
    )
  )
    return;

  // Warn like normal
  console.warn(`(!) ${warning.message}`);
};

/** @type {import("rollup").RollupOptions} */
export default {
  input: "./src/plugin/index.ts",
  output: {
    file: "./dist/plugin.js",
    format: "module",
    exports: "named",
  },
  onwarn,
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: [["babel-preset-solid", { generate: "dom", hydratable: false }]],
      extensions: EXTENSIONS,
    }),
    externalGlobals({
      "solid-js": "solidjs",
      "solid-js/web": "solidjsWeb",
    }),
    typescript({
      sourceMap: false,
      tsconfig: "./tsconfig.json",
    }),
    commonjs(),
    resolve({
      browser: true,
      exportConditions: [],
      extensions: EXTENSIONS,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser({
      mangle: {
        reserved: ["id", "label", "author", "version", "components"],
      },
    }),
  ],
};
