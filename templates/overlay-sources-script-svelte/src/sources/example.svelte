<svelte:options
  customElement={{
    tag: "example-source",
  }}
/>

<script>
  export let meal = "breakfast";
</script>

<p class="beans">
  My favourite meal is {meal}!
</p>

<style>
.beans {
  background-clip: text;
}
</style>
