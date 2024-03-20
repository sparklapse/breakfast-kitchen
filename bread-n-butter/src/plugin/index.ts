import type { PluginModule } from "@sparklapse/breakfast";

import Text from "./components/Text.svelte";
import TextEditor from "./components/TextEditor.svelte";
import Image from "./components/Image.svelte";
import ImageEditor from "./components/ImageEditor.svelte";

export const id = "bread-n-butter";
export const name = "Bread n Butter";
export const version = "1.0.0";
export const author = "Sparklapse";
export const components: PluginModule["components"] = [
  {
    id: "text",
    component: Text,
    editor: TextEditor,
    label: "Text",
    defaults: {
      text: "Hello, world!",
      size: 24,
      wrap: false,
      modifiers: [],
      alignment: "left",
      font: {
        family: "Gabarito",
        url: "https://cdn.jsdelivr.net/fontsource/fonts/gabarito@5/latin-400-normal.woff2",
      },
    },
  },
  {
    id: "image",
    component: Image,
    editor: ImageEditor,
    label: "Image",
    defaults: {
      imageSrc: "https://via.placeholder.com/150",
      fit: "cover",
      position: {
        x: 50,
        y: 50,
        pixel: false,
      },
    },
  },
];
