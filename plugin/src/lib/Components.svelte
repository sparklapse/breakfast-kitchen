<script lang="ts">
  import type { PluginModule } from "@sparklapse/breakfast";

  export let pluginComponent: PluginModule["components"][0];
  const { label, component, editor, defaults } = pluginComponent;
  let data: Record<string, unknown> = structuredClone(defaults);
</script>

<div class="flex flex-col gap-2 w-full h-full">
  <div class="border rounded shadow p-2 h-full">
    <h3 class="text-xl">{label}</h3>
    <div class="flex gap-2">
      <div>
        <h4 class="font-bold">Preview</h4>
        <div
          class="relative block w-[300px] min-h-[50px] max-h-[320px] box-content border-2 border-dashed resize-y overflow-hidden"
        >
          <svelte:component this={component} {...data} />
        </div>
      </div>
      <div class="w-full">
        <div class="flex justify-between items-baseline">
          <h4 class="font-bold">Editor</h4>
          <button
            class="bg-red-700 text-white text-sm rounded px-1"
            on:click={() => {
              data = structuredClone(defaults);
            }}
          >
            Reset to Defaults
          </button>
        </div>
        {#if editor}
          <div class="h-[20.5rem] overflow-y-auto px-1">
            <svelte:component this={editor} bind:data />
          </div>
        {:else}
          <sub>No editor for this component</sub>
        {/if}
      </div>
    </div>
  </div>
</div>
