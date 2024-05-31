import type { PluginModule } from "@sparklapse/breakfast";

// Import your components here
import * as Text from "./components/Example";

// Define your plugin here
export const id = "example";
export const label = "Your Plugin";
export const version = "0.0.0";
export const author = "You";
export const components: PluginModule["components"] = [
  {
    id: "example",
    label: "Example",
    component: Text.Component,
    editor: Text.Editor,
  },
];
