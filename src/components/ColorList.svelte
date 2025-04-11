<script>
  import { onMount } from "svelte";
  import { loadView, sortByColor, userColorToUrl } from "@/lib/utils";
  import Filter from "@/components/Filter.svelte";
  import { rgbToRgb } from "@/lib/colors";

  let colors = [];
  let grid = true;
  let term = "";

  onMount(() => {
    colors = JSON.parse(localStorage.getItem("hc_colors")).sort(sortByColor);
    grid = loadView();
  });

  $: filteredColors = colors.filter((item) => {
    const searchTerm = term.toLowerCase();
    const name = item.name.toLowerCase();

    return name.includes(searchTerm);
  });
</script>

<header class="fixed top-0 right-0 z-20 p-4 w-[calc(100%-80px)]">
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
      <article
        class="w-full rounded-xl border border-neutral-800/10 bg-white p-2 shadow"
      >
        <a
          href={userColorToUrl(color)}
          aria-label={color.name}
          class="flex w-full {grid && 'flex-col'} items-center gap-2"
        >
          <figure
            style={`background-color: ${rgbToRgb(color.rgb)}`}
            class="aspect-square {grid
              ? 'w-full'
              : 'w-18'} rounded-md border border-neutral-800/10"
          ></figure>

          <footer class="flex w-full flex-col text-left text-neutral-800">
            <h2 class="font-bold">{color.name}</h2>
            <p class="text-sm">{rgbToRgb(color.rgb)}</p>
          </footer>
        </a>
      </article>
    {/each}
  </section>
{/if}
