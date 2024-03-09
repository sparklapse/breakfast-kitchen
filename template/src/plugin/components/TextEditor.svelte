<script lang="ts">
  export let data: Record<string, any>;
</script>

<div>
  <div class="input">
    <label for="text">Text</label>
    <textarea style:resize="none" name="text" bind:value={data.text} />
  </div>
  <div>
    <label for="wrap">Wrap</label>
    <input type="checkbox" name="wrap" bind:checked={data.wrap} />
  </div>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
  }
</style>
