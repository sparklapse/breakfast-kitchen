<script lang="ts">
  import { pluginModuleType } from "@sparklapse/breakfast";
  import Components from "./Components.svelte";
  import * as p from "../plugin";

  const parsed = pluginModuleType.safeParse(p);
  const plugin = parsed.success ? parsed.data : undefined;
  const error = !parsed.success ? parsed.error : undefined;

  let editComponentId = window.location.hash.slice(1);
  $: editComponent = plugin?.components.find((c) => c.id === editComponentId);
</script>

<main class="grid justify-center">
  <div class="p-2 max-w-4xl w-screen">
    <h1 class="text-xl font-bold">Breakfast Plugin Workbench</h1>
    {#if error}
      <div class="bg-red-50 p-2 rounded">
        <h2 class="text-red-950 font-bold">Error Loading Plugin</h2>
        <p class="whitespace-pre">{error.message}</p>
      </div>
    {:else if plugin}
      <div class="flex flex-col mb-4">
        <p>
          {plugin.name} by {plugin.author} - v{plugin.version}
        </p>
      </div>
      <h2 class="text-3xl py-2">Components ({plugin.components.length})</h2>
      <div class="flex gap-2 h-[25rem]">
        <div class="flex flex-col gap-1 w-56 shrink-0 h-full overflow-y-auto">
          {#each plugin.components as { id, label }}
            <button
              class="px-1 rounded text-white transition-colors {editComponentId ===
              id
                ? 'bg-slate-800 shadow-xl'
                : 'bg-slate-600 shadow'}"
              on:click={() => {
                window.location.hash = id;
                editComponentId = id;
              }}
            >
              {label}
            </button>
          {/each}
        </div>
        {#key editComponent}
          {#if editComponent}
            <Components pluginComponent={editComponent} />
          {:else}
            <div class="h-full w-full rounded border grid place-content-center">
              <p class="text-slate-400">No Component selected</p>
            </div>
          {/if}
        {/key}
      </div>
    {/if}
  </div>
</main>
