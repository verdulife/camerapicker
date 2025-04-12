<script lang="ts">
  import type { RGB, UserColorStorage } from "@/lib/types";
  import { previewState, palette } from "@/lib/stores";
  import {
    saveColor,
    shareColor,
    copyColorValue,
    loadColors,
    deleteColor,
    updateColor,
  } from "@/lib/utils";
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
  import { onMount } from "svelte";
  import Dots from "@/assets/Dots.svelte";
  import Colors from "@/assets/Colors.svelte";
  import Share from "@/assets/Share.svelte";
  import Edit from "@/assets/Edit.svelte";
  import Close from "@/assets/Close.svelte";

  export let name: string;
  export let rgb_values: RGB;
  export let id: string;

  let { r, g, b } = rgb_values;

  let colorName: string,
    rgb: string,
    hex: string,
    cmyk: string,
    pantone: string,
    ral: string,
    lab: string,
    hsl: string,
    colors: UserColorStorage[],
    colorOwner: UserColorStorage | undefined;

  function updateValues() {
    colorName = name || rgbToName({ r, g, b });
    rgb = rgbToRgb({ r, g, b });
    hex = rgbToHex({ r, g, b });
    cmyk = rgbToCmyk({ r, g, b });
    pantone = rgbToPantone({ r, g, b });
    ral = rgbToRal({ r, g, b });
    lab = rgbToLab({ r, g, b });
    hsl = rgbToHsl({ r, g, b });
  }

  onMount(() => {
    updateValues();
    colors = loadColors();
    colorOwner = colors.find((color) => color.id === id);
  });

  function saveAndClosePreview() {
    const name = colorName || rgbToName({ r, g, b });

    saveColor({
      rgb: { r, g, b },
      name,
    });

    if ($previewState) $previewState = false;
  }

  function deleteAndBack() {
    if (!colorOwner) return;
    deleteColor(colorOwner);
    location.href = location.origin + "/colors";
  }

  function updateName() {
    if ($previewState) return;
    const name = colorName || rgbToName({ r, g, b });
    updateColor({ id, name, rgb: { r, g, b } });
  }

  function updateCurrentColor(values: RGB) {
    r = values.r;
    g = values.g;
    b = values.b;
    updateValues();
  }

  function isSelected(color: RGB) {
    return color.r === r && color.g === g && color.b === b;
  }
</script>

<div class="flex flex-col size-full max-w-xl bg-white text-neutral-900">
  <header class="relative flex flex-col">
    <figure
      id="colorPreview"
      style="background-color: {rgb}"
      class="w-full border-b border-neutral-800/10 px-5 max-h-[40svh] aspect-square"
    ></figure>

    {#if $previewState}
      <div class="flex absolute bottom-4 left-4 gap-2 right-4 h-14">
        {#each $palette as color}
          <button
            aria-label="palette color"
            style="background-color: {rgbToRgb(color)}"
            class="h-full aspect-square cursor-pointer rounded-full border border-neutral-800/10 outline-white outline-2"
            class:outline-2={isSelected(color)}
            on:click={() => updateCurrentColor(color)}
          >
          </button>
        {/each}
      </div>

      <button
        class="absolute right-3 top-3 p-3"
        on:click={() => ($previewState = false)}
      >
        <Close
          class="size-7 text-[gray] mix-blend-difference contrast-[9999] opacity-50"
        />
      </button>
    {/if}
  </header>

  <main class="px-5 pt-5">
    <label class="flex items-center gap-2 w-full justify-between">
      <input
        type="text"
        id="colorName"
        class="text-xl font-bold outline-none grow"
        bind:value={colorName}
        on:blur={updateName}
      />

      <Edit class="size-5" />
    </label>

    <div class="mt-5 flex w-full items-center gap-2">
      {#if colorOwner}
        <button
          id="save_color"
          class="flex grow items-center justify-center gap-1 rounded-full border border-neutral-900/20 px-6 py-3"
          on:click={deleteAndBack}
        >
          <Colors class="size-5" />

          <p class="text-sm">Eliminar color</p>
        </button>
      {:else}
        <button
          id="save_color"
          class="flex grow items-center justify-center gap-1 rounded-full border border-neutral-900/20 px-6 py-3"
          on:click={saveAndClosePreview}
        >
          <Colors class="size-5" />

          <p class="text-sm">Guardar color</p>
        </button>
      {/if}

      <button
        id="share"
        class="flex grow items-center justify-center gap-1 rounded-full border border-neutral-900/20 px-6 py-3"
        on:click={() => shareColor({ name: colorName, rgb: { r, g, b } })}
      >
        <Share class="size-5" />
        <p class="text-sm">Compartir</p>
      </button>
    </div>
  </main>

  <ul
    class="mt-4 flex flex-col overflow-y-auto border-t border-neutral-900/10"
    class:pb-3={$previewState}
    class:pb-32={!$previewState}
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

<style>
  ul {
    scrollbar-width: none;
  }
</style>
