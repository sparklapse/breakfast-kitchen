<script lang="ts">
  export let imageSrc: string = "";
  export let fit: string | "contain" | "cover" | "fill" | "none" | "scale-down";
  export let position: { x: number; y: number; pixel: boolean };
</script>

<img
  src={imageSrc}
  alt=""
  style:object-fit={fit}
  style:object-position="
  {position.x}{position.pixel ? "px" : "%"}
  {position.y}{position.pixel ? "px" : "%"}"
/>

<style>
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
</style>
