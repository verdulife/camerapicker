<script>
  import { slide } from "svelte/transition";
  import { rgb_values, previewState } from "@/lib/stores";
  import ColorPreview from "@/components/ColorPreview.svelte";

  function closePreview() {
    $previewState = false;
  }
</script>

{#if $previewState}
  <button
    aria-label="Cerrar previsualización"
    id="outer-dialog"
    class="fixed inset-0 z-10"
    on:click={closePreview}
  ></button>
  <div
    id="colorDialog"
    transition:slide={{ duration: 300 }}
    class="fixed right-0 bottom-0 left-0 z-20 mx-auto size-full max-w-xl gap-2 overflow-hidden rounded-tl-3xl rounded-tr-2xl flex flex-col shadow"
  >
    <ColorPreview rgb_values={$rgb_values} />
  </div>
{/if}
