<script>
  import { slide } from "svelte/transition";
  import { rgb_values, previewState } from "@/lib/stores";
  import { saveColor, shareColor, copyColorValue } from "@/lib/utils";
  import {
    rgbToCmyk,
    rgbToHex,
    rgbToHsl,
    rgbToLab,
    rgbToName,
    rgbToPantone,
    rgbToRal,
    rgbToRgb,
  } from "@/lib/colors";
  import Dots from "@/assets/Dots.svelte";
  import Colors from "@/assets/Colors.svelte";
  import Share from "@/assets/Share.svelte";

  let colorName, rgb, hex, cmyk, pantone, ral, lab, hsl;

  function updateValues() {
    colorName = rgbToName($rgb_values);
    rgb = rgbToRgb($rgb_values);
    hex = rgbToHex($rgb_values);
    cmyk = rgbToCmyk($rgb_values);
    pantone = rgbToPantone($rgb_values);
    ral = rgbToRal($rgb_values);
    lab = rgbToLab($rgb_values);
    hsl = rgbToHsl($rgb_values);
  }

  $: $previewState && updateValues();

  function closePreview() {
    $previewState = false;
  }

  function saveAndClosePreview() {
    saveColor({
      rgb: $rgb_values,
      name: colorName,
    });

    closePreview();
  }
</script>

{#if $previewState}
  <button
    aria-label="Cerrar previsualización"
    id="outer-dialog"
    class="fixed inset-0 z-20"
    on:click={closePreview}
  ></button>
  <div
    id="colorDialog"
    class="fixed right-0 bottom-0 left-0 z-30 mx-auto flex max-h-9/12 w-full max-w-lg flex-col gap-2 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-white text-neutral-900 shadow"
    transition:slide={{ duration: 300 }}
  >
    <header>
      <figure
        id="colorPreview"
        style="background-color: {rgb}"
        class="h-[25svh] w-full rounded-tl-3xl rounded-tr-3xl border-b border-neutral-800/10 px-5"
      ></figure>
    </header>

    <main class="px-5">
      <input
        type="text"
        id="colorName"
        class="mt-2 text-xl font-bold outline-none"
        bind:value={colorName}
      />

      <div class="mt-4 flex w-full items-center gap-2">
        <button
          id="save_color"
          class="flex grow items-center justify-center gap-1 rounded-full border border-neutral-900/20 px-6 py-3"
          on:click={saveAndClosePreview}
        >
          <Colors class="size-5" />
          <p class="text-sm">Guardar color</p>
        </button>

        <button
          id="share"
          class="flex grow items-center justify-center gap-1 rounded-full border border-neutral-900/20 px-6 py-3"
          on:click={() => shareColor($rgb_values)}
        >
          <Share class="size-5" />
          <p class="text-sm">Compartir</p>
        </button>
      </div>
    </main>

    <ul
      class="mt-4 flex flex-col overflow-y-auto border-t border-neutral-900/10 pb-5"
    >
      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">RGB</p>

        <button
          id="rgbOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(rgb)}
        >
          <p>{rgb}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">HEX</p>

        <button
          id="hexOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(hex)}
        >
          <p>{hex}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">CMYK</p>

        <button
          id="cmykOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(cmyk)}
        >
          <p>{cmyk}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">Pantone</p>

        <button
          id="pantoneOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(pantone)}
        >
          <p>{pantone}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">RAL</p>

        <button
          id="ralOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(ral)}
        >
          <p>{ral}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col border-b border-neutral-900/10 px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">LAB</p>

        <button
          id="labOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(lab)}
        >
          <p>{lab}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>

      <li class="flex flex-col px-5 py-3">
        <p class="text-xs font-semibold text-neutral-600">HSL</p>

        <button
          id="hslOut"
          class="flex w-full items-center justify-between"
          on:click={() => copyColorValue(hsl)}
        >
          <p>{hsl}</p>
          <Dots class="pointer-events-none right-4 size-4 text-neutral-400" />
        </button>
      </li>
    </ul>
  </div>
{/if}

<style>
  ul {
    scrollbar-width: none;
  }
</style>
