import { resolve } from "node:path";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { compile, preprocess } from "svelte/compiler";
import { build } from "esbuild";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import config from "./svelte.config.js";
import plugin from "./src/plugin.js";

const sveltePlugin = {
  name: "svelte",
  setup: (build) => {
    build.onLoad({ filter: /\.svelte$/ }, async (args) => {
      const path = resolve(import.meta.dirname, "src/components", args.path);
      let source = await readFile(path, "utf8");
      // Config preprocess (svelte-preprocess) by default
      if (config.preprocess) {
        const processed = await preprocess(source, config.preprocess);
        source = processed.code;
      }
      // Postcss Autoprefixer
      const stylePrefixed = await preprocess(source, {
        style: async ({ content }) => {
          const result = await postcss([autoprefixer({ overrideBrowserslist: ["chrome <= 103"] })]).process(content, { from: undefined });
          return { code: result.css, map: "" };
        }
      });
      source = stylePrefixed.code;
      let { js } = compile(source, { ...config.compilerOptions, filename: args.path });

      return {
        contents: js.code,
        loader: "js",
      };
    })
  }
}

const sources = await readdir("./src/sources");

let sourcesIndex = "";
for (const source of sources) {
  sourcesIndex += `import "./src/sources/${source}";\n`;
}

const built = await build({
  stdin: {
    contents: sourcesIndex,
    resolveDir: ".",
    sourcefile: sourcesIndex,
  },
  plugins: [
    sveltePlugin,
  ],
  platform: "browser",
  bundle: true,
  format: "iife",
  write: false,
});

plugin.script = built.outputFiles[0].text;
await writeFile("plugin.json", JSON.stringify(plugin), { encoding: "utf-8" });
