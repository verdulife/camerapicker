<script lang="ts">
  import { rgb_values, previewState } from "@/lib/stores";
  import Colors from "@/assets/Colors.svelte";
  import Hunter from "@/assets/Hunter.svelte";
  import Users from "@/assets/Users.svelte";
  import { rgbToRgb } from "@/lib/colors";

  export let pathname: string;
  const isHome = pathname === "/";

  function openPreview() {
    $previewState = true;
  }
</script>

<footer
  class="pointer-events-none fixed bottom-10 flex w-full items-end justify-center gap-4"
>
  <nav
    class="pointer-events-auto flex rounded-full border border-neutral-800 bg-black px-4 text-neutral-400"
  >
    <a href="/colors" class="p-5">
      <Colors class="size-6" />
    </a>

    {#if isHome}
      <button
        aria-label="color_output"
        style="background-color: {rgbToRgb($rgb_values)}"
        class="pointer-events-auto size-16 shrink-0 scale-125 cursor-pointer rounded-full border-2 bg-black border-white shadow mx-2"
        on:click={openPreview}
      >
      </button>
    {:else}
      <a href="/" class="p-5">
        <Hunter class="size-6" />
      </a>
    {/if}

    <a href="/online" class="p-5">
      <Users class="size-6" />
    </a>
  </nav>
</footer>
