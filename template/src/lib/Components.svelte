<script lang="ts">
  import { Source, EditorStyles } from "@sparklapse/breakfast";
  import type { PluginModule } from "@sparklapse/breakfast";
  export let components: PluginModule["components"];

  export let dataSets: Record<string, unknown>[] = structuredClone(
    components.map((c) => c.defaults)
  );
</script>

<div class="flex flex-col gap-2">
  {#each components as { label, component, editor, defaults }, i}
    <div class="border rounded shadow p-2">
      <h3 class="text-xl">{label}</h3>
      <div class="flex gap-2">
        <div>
          <h4 class="font-bold">Preview</h4>
          <div
            class="relative block w-[300px] min-h-[50px] max-h-[400px] box-content border-2 border-dashed resize-y overflow-hidden"
          >
            <svelte:component this={component} {...dataSets[i]} />
          </div>
        </div>
        <div class="max-w-sm w-full shrink-0">
          <h4 class="mb-2 font-bold">Editor</h4>
          {#if editor}
            <div class="max-h-[400px] overflow-y-auto">
              <EditorStyles>
                <svelte:component this={editor} bind:data={dataSets[i]} />
              </EditorStyles>
            </div>
          {:else}
            <sub>No editor for this component</sub>
          {/if}
        </div>
        <div class="w-full overflow-auto">
          <h4 class="font-bold">Default Values</h4>
          <code class="block whitespace-pre text-sm leading-4"
            >{JSON.stringify(defaults, undefined, 2)}</code
          >
        </div>
      </div>
    </div>
  {/each}
</div>
