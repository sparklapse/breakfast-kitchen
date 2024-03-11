<script lang="ts">
  import { pluginModuleType } from "@sparklapse/breakfast";
  import * as p from "../plugin";
  import Components from "./Components.svelte";

  const parsed = pluginModuleType.safeParse({ id: "dev", ...p });
  const plugin = parsed.success ? parsed.data : undefined;
  const error = !parsed.success ? parsed.error : undefined;
</script>

<main class="p-2">
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
    <Components components={plugin.components} />
  {/if}
</main>
