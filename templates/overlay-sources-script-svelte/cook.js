import { resolve } from "node:path";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { compile } from "svelte/compiler";
import { build } from "esbuild";
import config from "./svelte.config.js";
import plugin from "./src/plugin.js";

const sveltePlugin = {
  name: "svelte",
  setup: (build) => {
    build.onLoad({ filter: /\.svelte$/ }, async (args) => {
      const path = resolve(import.meta.dirname, "src/components", args.path);
      let { js } = compile(await readFile(path, "utf8"), { ...config.compilerOptions, filename: args.path });

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
