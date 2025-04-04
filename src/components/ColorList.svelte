<script>
  import { onMount } from "svelte";
  import ColorCard from "@/components/ColorCard.svelte";
  import Filter from "@/components/Filter.svelte";

  let colors = [];
  let sort = true;
  let term = "";

  onMount(() => {
    colors = JSON.parse(localStorage.getItem("hc_colors"));
  });

  function sortByColor(a, b) {
    if (sort) {
      if (a.rgb.r + a.rgb.g + a.rgb.b > b.rgb.r + b.rgb.g + b.rgb.b) return -1;
      if (a.rgb.r + a.rgb.g + a.rgb.b < b.rgb.r + b.rgb.g + b.rgb.b) return 1;
      return 0;
    }
    return 0;
  }

  function filterByTerm(color) {
    if (term.length === 0) return true;
    return color.name.toLowerCase().includes(term.toLowerCase());
  }

  $: filterColors = colors.filter(filterByTerm).sort(sortByColor);
</script>

<!-- <header class="fixed top-0 right-0 z-20 p-4">
  <Filter bind:term bind:sort />
</header> -->

{#if !colors || colors.length === 0}
  <section
    class="flex w-full flex-1 flex-col items-center justify-center gap-2"
  >
    <p class="text-neutral-50">No hay colores guardados</p>
  </section>
{:else}
  <section
    class="grid w-full max-w-6xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
  >
    {#each filterColors as color}
      <ColorCard {color} />
    {/each}
  </section>
{/if}
