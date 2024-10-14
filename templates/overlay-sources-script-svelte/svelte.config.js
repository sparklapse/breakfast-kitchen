import { sveltePreprocess } from "svelte-preprocess";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    generate: "dom",
    customElement: true,
  },
};

export default config;
