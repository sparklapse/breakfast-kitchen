<script lang="ts">
  import { onMount } from "svelte";

  let color = 0;

  onMount(() => {
    const interval = setInterval(() => {
      color = (color + 1) % 360;
    });

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="fill" style:background-color="hsl({color}deg, 100%, 50%)" />

<style>
  .fill {
    position: absolute;
    inset: 0;
  }
</style>
