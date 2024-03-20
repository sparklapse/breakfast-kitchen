<script lang="ts">
  export let size: number = 24;
  export let text: string = "Hello world!";
  export let wrap: boolean = true;
  export let modifiers: ("bold" | "italic" | "underline")[] = [];
  export let alignment: "left" | "center" | "right" = "left";
  export let font: { family: string; url: string } = {
    family: "Gabarito",
    url: "https://cdn.jsdelivr.net/fontsource/fonts/gabarito@5/latin-400-normal.woff2",
  };

  $: fontStyle = `
    @font-face {
      font-family: ${font.family};
      src: url(${font.url});
    }
  `;
</script>

<svelte:element this="style">
  {fontStyle}
</svelte:element>

<p
  style:font-family="{font.family}, sans-serif"
  style:font-size="{size}px"
  style:font-weight={modifiers.includes("bold") ? "bold" : "normal"}
  style:font-style={modifiers.includes("italic") ? "italic" : "normal"}
  style:text-decoration={modifiers.includes("underline") ? "underline" : "none"}
  style:text-align={alignment}
  style:white-space={wrap ? "normal" : "pre"}
>
  {text}
</p>
