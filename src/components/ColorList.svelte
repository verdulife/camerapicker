<script>
  import { onMount } from "svelte";
  import { sortByColor } from "@/lib/utils";
  import ColorCard from "@/components/ColorCard.svelte";
  import Filter from "@/components/Filter.svelte";

  let colors = [];
  let grid = true;
  let term = "";

  onMount(() => {
    colors = JSON.parse(localStorage.getItem("hc_colors"));
  });

  $: filteredColors = colors.filter((item) => {
    console.log(item);

    return item.name.indexOf(term) !== -1;
  });
</script>

<header class="fixed top-0 right-0 z-20 p-4">
  <Filter bind:term bind:grid />
</header>

{#if !colors || colors.length === 0}
  <section
    class="flex w-full flex-1 flex-col items-center justify-center gap-2"
  >
    <p class="text-neutral-50">No hay colores guardados</p>
  </section>
{:else}
  <section
    class="grid w-full max-w-6xl {grid
      ? 'grid-cols-2'
      : 'grid-cols-1'} sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
  >
    {#each filteredColors as color}
      <ColorCard {color} {grid} />
    {/each}
  </section>
{/if}
