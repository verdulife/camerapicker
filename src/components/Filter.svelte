<script lang="ts">
  import Search from "@/assets/Search.svelte";
  import Grid from "@/assets/Grid.svelte";
  import List from "@/assets/List.svelte";
  import { saveView } from "@/lib/utils";

  export let term: string, grid: boolean;

  function setView() {
    grid = !grid;
    saveView(grid);
  }
</script>

<search class="flex gap-2 h-11 rounded-full w-full">
  <form
    class="grow flex items-center bg-black border border-neutral-900/10 rounded-full"
  >
    <label class="flex size-full justify-end">
      <Search class="h-full p-3 text-neutral-400" />

      <input
        type="text"
        id="inputFilter"
        placeholder="Buscar por nombre"
        class="outline-none size-full pr-4"
        bind:value={term}
      />
    </label>
  </form>

  <button
    id="sortFilter"
    class="bg-black border border-neutral-900/10 rounded-full h-full aspect-square flex justify-center items-center"
    class:rotate-180={grid}
    on:click={setView}
  >
    {#if grid}
      <List class="size-4" />
    {:else}
      <Grid class="size-4" />
    {/if}
  </button>
</search>
