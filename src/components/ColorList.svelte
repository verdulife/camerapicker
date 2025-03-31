<script>
  import { onMount } from "svelte";
  import ColorCard from "@/components/ColorCard.svelte";

  let colors = [];

  onMount(() => {
    colors = JSON.parse(localStorage.getItem("hc_colors"));
  });
</script>

{#if !colors || colors.length === 0}
  <section
    class="flex w-full flex-1 flex-col items-center justify-center gap-2"
  >
    <p class="text-neutral-50">No hay colores guardados</p>
  </section>
{:else}
  <section class="grid w-full grid-cols-2 gap-2">
    {#each colors as color}
      <ColorCard {color} />
    {/each}
  </section>
{/if}
