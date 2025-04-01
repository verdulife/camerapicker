<script>
  import Search from "@/assets/Search.svelte";
  import Sort from "@/assets/Sort.svelte";

  export let term, sort;
</script>

<search
  class="flex overflow-hidden gap-2 size-11 focus-within:w-auto transition rounded-full"
>
  <form
    class="flex items-center bg-black border border-neutral-900/10 rounded-full"
  >
    <label class="flex shrink-0 h-full">
      <Search class="h-full p-2 text-neutral-400" />

      <input
        type="text"
        id="inputFilter"
        size="14"
        placeholder="Buscar por nombre"
        class="outline-none h-full text-sm pr-4"
        bind:value={term}
      />
    </label>
  </form>

  <button
    id="sortFilter"
    class="bg-black border border-neutral-900/10 rounded-full h-full aspect-square flex justify-center items-center"
    class:rotate-180={sort}
    on:click={() => (sort = !sort)}
  >
    <Sort class="size-4" />
  </button>
</search>
