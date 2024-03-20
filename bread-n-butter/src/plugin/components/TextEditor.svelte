<script lang="ts">
  import { fonts } from "./fonts";
  import { Combobox, Toolbar, Separator } from "bits-ui";
  import type { ComponentProps } from "@sparklapse/breakfast/plugin";
  import type Text from "./Text.svelte";

  export let data: ComponentProps<typeof Text>;

  let fontInput = "";
  $: filteredFonts = fontInput
    ? fonts.filter((font) =>
        font.family.toLocaleLowerCase().includes(fontInput.toLowerCase())
      )
    : fonts;

  let selected: { value: string; label: string } = {
    value: "roboto-flex",
    label: "Roboto Flex",
  };

  const updateSelectedFromData = (_: unknown) => {
    const font = fonts.find((font) => font.family === data.font?.family);
    if (!font) return;
    selected = {
      value: font.id,
      label: font.family,
    };
  };

  $: updateSelectedFromData(data);

  const updateFont = (selected: { value: string; label: string }) => {
    const font = fonts.find((font) => font.id === selected.value);
    if (!font) return;

    const family = font.family;
    const url = `https://cdn.jsdelivr.net/fontsource/fonts/${font.id}@5/latin-400-normal.woff2`;

    data = { ...data, font: { family, url } };
  };

  $: updateFont(selected);

  let wrap = data.wrap ? "wrap" : "";
  const updateWrap = (wrap: boolean) => {
    data = { ...data, wrap };
  };
  const updateWrapFromData = (_: unknown) => {
    wrap = data.wrap ? "wrap" : "";
  };
  $: updateWrap(wrap === "wrap");
  $: updateWrapFromData(data);
</script>

<div class="text-editor">
  <Toolbar.Root>
    <Toolbar.Group bind:value={data.modifiers} type="multiple">
      <Toolbar.GroupItem value="bold">
        <!-- https://lucide.dev/icons/bold -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-bold"
          ><path d="M14 12a4 4 0 0 0 0-8H6v8" /><path
            d="M15 20a4 4 0 0 0 0-8H6v8Z"
          /></svg
        >
      </Toolbar.GroupItem>
      <Toolbar.GroupItem value="italic">
        <!-- https://lucide.dev/icons/italic -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-italic"
          ><line x1="19" x2="10" y1="4" y2="4" /><line
            x1="14"
            x2="5"
            y1="20"
            y2="20"
          /><line x1="15" x2="9" y1="4" y2="20" /></svg
        >
      </Toolbar.GroupItem>
      <Toolbar.GroupItem value="underline">
        <!-- https://lucide.dev/icons/underline -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-underline"
          ><path d="M6 4v6a6 6 0 0 0 12 0V4" /><line
            x1="4"
            x2="20"
            y1="20"
            y2="20"
          /></svg
        >
      </Toolbar.GroupItem>
    </Toolbar.Group>
    <Separator.Root />
    <Toolbar.Group bind:value={data.alignment}>
      <Toolbar.GroupItem value="left">
        <!-- https://lucide.dev/icons/align-left -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-align-left"
          ><line x1="21" x2="3" y1="6" y2="6" /><line
            x1="15"
            x2="3"
            y1="12"
            y2="12"
          /><line x1="17" x2="3" y1="18" y2="18" /></svg
        >
      </Toolbar.GroupItem>
      <Toolbar.GroupItem value="center">
        <!-- https://lucide.dev/icons/align-center -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-align-center"
          ><line x1="21" x2="3" y1="6" y2="6" /><line
            x1="17"
            x2="7"
            y1="12"
            y2="12"
          /><line x1="19" x2="5" y1="18" y2="18" /></svg
        >
      </Toolbar.GroupItem>
      <Toolbar.GroupItem value="right">
        <!-- https://lucide.dev/icons/align-right -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-align-right"
          ><line x1="21" x2="3" y1="6" y2="6" /><line
            x1="21"
            x2="9"
            y1="12"
            y2="12"
          /><line x1="21" x2="7" y1="18" y2="18" /></svg
        >
      </Toolbar.GroupItem>
    </Toolbar.Group>
    <Separator.Root />
    <Toolbar.Group bind:value={wrap}>
      <Toolbar.GroupItem value="wrap">
        <!-- https://lucide.dev/icons/wrap-text -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-wrap-text"
          ><line x1="3" x2="21" y1="6" y2="6" /><path
            d="M3 12h15a3 3 0 1 1 0 6h-4"
          /><polyline points="16 16 14 18 16 20" /><line
            x1="3"
            x2="10"
            y1="18"
            y2="18"
          /></svg
        >
      </Toolbar.GroupItem>
    </Toolbar.Group>
  </Toolbar.Root>
  <textarea id="text" bind:value={data.text} />
  <div class="inline-input">
    <label for="size">Size</label>
    <input type="number" id="size" bind:value={data.size} />
  </div>
  <div>
    <div class="inline-input">
      <label for="font">Font</label>
      <Combobox.Root
        items={filteredFonts}
        portal={null}
        bind:inputValue={fontInput}
        bind:selected
      >
        <Combobox.Input
          on:keydown={(ev) => {
            if (
              ev.detail.originalEvent.key === "Enter" &&
              filteredFonts.length > 0
            ) {
              selected = {
                value: filteredFonts[0].id,
                label: filteredFonts[0].family,
              };
              ev.preventDefault();
            }
          }}
          placeholder="Select a font"
        />
        <Combobox.Content sideOffset={8}>
          {#each filteredFonts as { id, family } (id)}
            <Combobox.Item value={id} label={family}>
              <Combobox.ItemIndicator asChild={false}>✔</Combobox.ItemIndicator
              >
              {family}
            </Combobox.Item>
          {/each}
        </Combobox.Content>
        <Combobox.HiddenInput name="font" />
      </Combobox.Root>
    </div>
    <sup>
      Powered by <a
        class="external"
        href="https://fontsource.org/"
        target="_blank ">FontSource</a
      >
    </sup>
  </div>
</div>

<style>
  /* Editor Styles */
  .text-editor {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    gap: 0.5rem;
  }

  .text-editor .inline-input {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .text-editor .inline-input input {
    width: 100%;
  }

  /* Toolbar Seperator */
  .text-editor :global([data-toolbar-root] [data-separator-root]) {
    margin: 0 0.1rem;
    border-left: #bbb solid 1px;
  }

  /* Font Selector Combobox */
  .text-editor .inline-input :global([data-combobox-input]) {
    width: 100%;
  }

  .text-editor :global([data-combobox-content]) {
    padding: 0.25rem 0.5rem;
    width: 100%;
    max-height: 14rem;
    overflow-y: auto;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .text-editor :global([data-combobox-content] [data-combobox-item]) {
    display: flex;
    gap: 0.25rem;
    cursor: pointer;
  }
  .text-editor :global([data-combobox-content] [data-combobox-item]:hover),
  .text-editor
    :global([data-combobox-content] [data-combobox-item][data-highlighted]) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* Decorations (bold, italic, underline) */
  .text-editor :global([data-toolbar-root]) {
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border: #bbb solid 1px;
    border-radius: 0.25rem;
  }

  .text-editor :global([data-toolbar-group]) {
    display: flex;
    align-items: center;
  }

  .text-editor :global([data-toolbar-group-item]) {
    padding: 0.1rem;
    aspect-ratio: 1;
    transition: background-color 0.1s ease-in-out;
  }

  .text-editor :global([data-toolbar-group-item]:last-child) {
    border-radius: 0 0.125rem 0.125rem 0;
  }

  .text-editor :global([data-toolbar-group-item][pressed="true"]) {
    background-color: #dfdfdf;
  }
</style>
