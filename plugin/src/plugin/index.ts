import type { PluginModule } from "@sparklapse/breakfast";

import Colors from "./components/Colors.svelte";
import ColorsEditor from "./components/ColorsEditor.svelte";

export const id = "example";
export const name = "Your Plugin";
export const version = "0.0.0";
export const author = "You";
export const components: PluginModule["components"] = [
  {
    id: "color",
    label: "Colors",
    component: Colors,
    editor: ColorsEditor,
    defaults: {
      speed: 0.1,
      offset: 0,
    },
  },
];
