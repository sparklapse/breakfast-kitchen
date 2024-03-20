<script lang="ts">
  import { Select } from "bits-ui";
  import type { ComponentProps } from "@sparklapse/breakfast/plugin";
  import type Image from "./Image.svelte";

  export let data: ComponentProps<typeof Image>;

  const fits: Record<string, string> = {
    contain: "Contain",
    cover: "Cover",
    fill: "Fill",
    none: "None",
    "scale-down": "Scale Down",
  };
</script>

<div class="image-editor">
  <div class="inline-input">
    <label for="image-source">Image URL</label>
    <input
      type="text"
      id="image-source"
      name="image-source"
      bind:value={data.imageSrc}
    />
  </div>
  <div class="inline-input">
    <label for="fit">Fit</label>
    <Select.Root
      items={Object.entries(fits).map(([value, label]) => ({ value, label }))}
      portal={null}
      selected={{ value: data.fit, label: fits[data.fit] }}
      onSelectedChange={(ev) => {
        if (!ev) return;
        data.fit = ev.value;
      }}
    >
      <Select.Trigger class="common-input">
        <Select.Value placeholder="Select a fit" />
      </Select.Trigger>
      <Select.Content>
        {#each Object.entries(fits).map( ([value, label]) => ({ value, label }) ) as { value, label }}
          <Select.Item {value} {label}>
            <Select.ItemIndicator asChild={false}>✔</Select.ItemIndicator>
            {label}
          </Select.Item>
        {/each}
      </Select.Content>
      <Select.Input name="fit" bind:value={data.fit} />
    </Select.Root>
  </div>
  <div class="positioning">
    <div class="pos-header">
      <p>Position</p>
      <div>
        <label for="pixel-pos">Pixel Pos</label>
        <input
          type="checkbox"
          on:change={(ev) => {
            if (ev.currentTarget.checked) {
              data.position = {
                x: 0,
                y: 0,
                pixel: true,
              };
            } else {
              data.position = {
                x: 50,
                y: 50,
                pixel: false,
              };
            }
          }}
          checked={data.position.pixel}
        />
      </div>
    </div>
    {#if data.position.pixel}
      <div class="inline-input">
        <label for="pos-abs-x">X</label>
        <input
          type="number"
          id="pos-abs-x"
          name="pos-abs-x"
          bind:value={data.position.x}
        />
      </div>
      <div class="inline-input">
        <label for="pos-abs-y">Y</label>
        <input
          type="number"
          id="pos-abs-y"
          name="pos-abs-y"
          bind:value={data.position.y}
        />
      </div>
    {:else}
      <div class="inline-input">
        <label for="pos-rel-x">X</label>
        <input
          type="range"
          id="pos-rel-x"
          name="pos-rel-x"
          min="0"
          max="100"
          bind:value={data.position.x}
        />
      </div>
      <div class="inline-input">
        <label for="pos-rel-y">Y</label>
        <input
          type="range"
          id="pos-rel-y"
          name="pos-rel-y"
          min="0"
          max="100"
          bind:value={data.position.y}
        />
      </div>
    {/if}
    <button
      class="position-reset"
      on:click={() => {
        data.position = {
          x: 50,
          y: 50,
          pixel: false,
        };
      }}>Reset Position</button
    >
  </div>
</div>

<style>
  .image-editor {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .image-editor .inline-input {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    white-space: nowrap;
  }

  .image-editor .inline-input input {
    width: 100%;
  }

  /* Fit Select */
  .image-editor :global([data-select-trigger]) {
    width: 100%;
    text-align: left;
  }

  .image-editor :global([data-select-content]) {
    padding: 0.25rem;
    background-color: white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
  }

  .image-editor :global([data-select-item]) {
    display: flex;
    gap: 0.5rem;
    cursor: pointer;
  }

  .image-editor :global([data-select-item]:hover),
  .image-editor :global([data-select-item][data-highlighted]) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* Positioning */
  .image-editor .positioning {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .image-editor .pos-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .image-editor .position-reset {
    font-size: 0.75rem;
    text-decoration: underline;
    align-self: end;
    width: fit-content;
  }
</style>
