<script lang="ts">
  export let text = "Hello world!";
  export let wrap = true;
</script>

<p style:white-space={wrap ? "pre" : undefined}>
  {text}
</p>
