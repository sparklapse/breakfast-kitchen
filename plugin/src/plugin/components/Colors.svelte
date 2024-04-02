<script lang="ts">
  import { onDestroy } from "svelte";

  // Exporting variables makes them available to the editor
  export let speed = 0.1;
  export let offset = 0;

  // Normal variables are reactive! So when you change them, the UI will update with said change
  // Learn more about svelte reactivity here: https://learn.svelte.dev/tutorial/reactive-declarations
  let color = 0;

  const interval = setInterval(() => {
    // If you need to do changes over time, use performance now instead of your own counter
    // This makes it easier and more consistent to sync with other animations with other plugins
    color = (performance.now() * speed + offset) % 360;
  });

  // On destroy is run when the user removes your component from the scene editor
  // Make sure you do any cleanup logic here
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<!-- You can use variables in your html by wrapping it with {} -->
<div class="fill" style="background-color: hsl({color}deg, 100%, 50%)" />

<!--
  Styles automatically scope to your components only!
  So don't worry about making class names super unique.
  Learn more about styles here: https://learn.svelte.dev/tutorial/component-styles
-->
<style>
  .fill {
    position: absolute;
    inset: 0;
  }
</style>
