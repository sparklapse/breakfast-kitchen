<script lang="ts">
  // Only import the type of the component to use with the ComponentProps type
  import type Colors from "./Colors.svelte";
  import type { ComponentProps } from "@sparklapse/breakfast/plugin";

  // The ComponentProps type will infer props exported by the component
  // so you get type saftey and autocomplete between your component and editor
  export let data: ComponentProps<typeof Colors>;
</script>

<div>
  <div class="input">
    <label for="text">Speed</label>
    <!--
      Bindings let you automagically take the user input and changes
      and update the data variable
      Learn more: https://learn.svelte.dev/tutorial/text-inputs
    -->
    <input
      name="text"
      type="number"
      step="0.01"
      min="0.01"
      max="0.25"
      bind:value={data.speed}
    />
    <label for="text">Offset</label>
    <input name="text" type="number" bind:value={data.offset} />
  </div>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
  }
</style>
