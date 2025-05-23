<script lang="ts">
  import { onMount } from "svelte";
  import { isTouchDevice } from "@/lib/consts";
  import { analizer, rgb_values, previewState, palette } from "@/lib/stores";
  import {
    drawAnalizer,
    analyzeColorToDominant,
    analyzeColorToPalette,
  } from "@/lib/analizer";
  import Picture from "@/assets/Picture.svelte";

  let video: HTMLVideoElement;
  let image: HTMLImageElement;
  let imageSrc = "";
  let canvas: HTMLCanvasElement;
  let analizerCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null,
    analizerCtx: CanvasRenderingContext2D | null;
  let targetSelection = { x: 0, y: 0, zoom: 0 };
  let canvasSource: HTMLVideoElement | HTMLImageElement;

  onMount(handleSize);

  async function handleSize() {
    const { innerWidth, innerHeight } = window;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: isTouchDevice ? innerHeight : innerWidth,
        height: isTouchDevice ? innerWidth : innerHeight,
        facingMode: "enviorment",
      },
    });

    video.srcObject = stream;
    canvasSource = video;

    ctx = canvas.getContext("2d", {
      willReadFrequently: true,
      colorSpace: "display-p3",
    });

    analizerCanvas = document.createElement("canvas");
    analizerCtx = analizerCanvas.getContext("2d", {
      colorSpace: "display-p3",
    });

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    analizerCanvas.width = $analizer.size;
    analizerCanvas.height = $analizer.size;

    $analizer.x = targetSelection.x =
      innerWidth / 2 - ($analizer.size * $analizer.zoom) / 2;
    $analizer.y = targetSelection.y =
      innerHeight / 2 - $analizer.size * $analizer.zoom;
    targetSelection.zoom = $analizer.zoom;
  }

  async function animateSelection() {
    drawAnalizer(ctx, analizerCtx, $analizer, canvasSource, analizerCanvas);
    const res = await analyzeColorToDominant(ctx, $analizer, analizerCanvas);

    $analizer.x += (targetSelection.x - $analizer.x) * 0.2;
    $analizer.y += (targetSelection.y - $analizer.y) * 0.2;
    $analizer.zoom += (targetSelection.zoom - $analizer.zoom) * 0.2;

    if (!res) return;
    $rgb_values = res;

    requestAnimationFrame(animateSelection);
  }

  function updateSelection(event: MouseEvent | TouchEvent) {
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;

    targetSelection.x = clientX - ($analizer.size * $analizer.zoom) / 2;
    targetSelection.y = clientY - ($analizer.size * $analizer.zoom) / 2;
  }

  async function getPalette() {
    const res = await analyzeColorToPalette(ctx, $analizer, analizerCanvas);
    if (!res) return;
    $palette = res;
  }

  $: if ($previewState) getPalette();

  function loadImage() {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const image = new Image();
      image.width = window.innerWidth;
      image.height = window.innerHeight;
      image.src = imageSrc = URL.createObjectURL(file);
      image.onload = () => {
        canvasSource = image;
      };
    };

    input.click();
  }
</script>

<svelte:window on:resize={handleSize} />

<img
  src="/logo.svg"
  alt="HunterColor logo"
  class="absolute inset-0 h-14 m-auto"
/>

<video
  bind:this={video}
  playsinline
  autoplay
  muted
  class="absolute top-0 left-0 size-full"
  on:play={animateSelection}
  on:click={updateSelection}
>
</video>

{#if imageSrc}
  <button on:click={updateSelection}>
    <img
      bind:this={image}
      src={imageSrc}
      alt="Imagen cargada"
      class="absolute inset-0 size-full object-cover"
      on:load={animateSelection}
    />
  </button>
{/if}

<canvas bind:this={canvas} class="pointer-events-none absolute top-0 left-0">
</canvas>

<!-- <button class="fixed top-6 right-6 size-12 p-3" on:click={loadImage}>
  <Picture class="size-full" />
</button> -->
