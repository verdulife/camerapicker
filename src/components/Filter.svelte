<script>
  import Search from "@/assets/Search.svelte";
  import Grid from "@/assets/Grid.svelte";
  import List from "@/assets/List.svelte";

  export let term, grid;
</script>

<search class="flex gap-2 h-11 rounded-full">
  <!-- <form
    class="flex items-center bg-black border border-neutral-900/10 rounded-full"
  >
    <label class="flex h-full">
      <Search class="h-full p-3 text-neutral-400" />

      <input
        type="text"
        id="inputFilter"
        size="14"
        placeholder="Buscar por nombre"
        class="outline-none h-full text-sm pr-4"
        bind:value={term}
      />
    </label>
  </form> -->

  <button
    id="sortFilter"
    class="bg-black border border-neutral-900/10 rounded-full h-full aspect-square flex justify-center items-center"
    class:rotate-180={grid}
    on:click={() => (grid = !grid)}
  >
    {#if grid}
      <List class="size-4" />
    {:else}
      <Grid class="size-4" />
    {/if}
  </button>
</search>
