import type { PluginModule } from "@sparklapse/dots";

import Text from "./components/Text.svelte";
import TextEditor from "./components/TextEditor.svelte";

export const id = "example";
export const name = "With Editor";
export const version = "0.0.0";
export const author = "You";
export const components: PluginModule["components"] = [
  {
    id: "text",
    label: "Text",
    component: Text,
    editor: TextEditor,
    defaults: {
      text: "The quick brown fox\njumps over\nthe lazy dog.",
      wrap: true,
    },
  },
];
