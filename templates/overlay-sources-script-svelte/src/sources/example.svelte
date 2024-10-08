<svelte:options
  customElement={{
    tag: "example-source",
  }}
/>

<script>
  export let meal = "breakfast";
</script>

<p>
  My favourite meal is {meal}!
</p>
