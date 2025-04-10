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
  let canvas: HTMLCanvasElement;
  let analizerCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null,
    analizerCtx: CanvasRenderingContext2D | null;
  let targetSelection = { x: 0, y: 0, zoom: 0 };

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
    drawAnalizer(ctx, analizerCtx, $analizer, video, analizerCanvas);
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

  /* function zoomAnalizer() {
    const currentZoom = Math.floor($analizer.zoom);

    if (currentZoom === 1) {
      targetSelection.zoom = 2.5;
    }

    if (currentZoom === 2) {
      targetSelection.zoom = 1.5;
    }
  } */

  async function getPalette() {
    const res = await analyzeColorToPalette(ctx, $analizer, analizerCanvas);
    if (!res) return;
    $palette = res;
  }

  $: if ($previewState) getPalette();

  /* function loadImage() {
    const input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (!ctx) return;

        URL.revokeObjectURL(image.src);
        ctx.drawImage(image, 0, 0);
        $analizer.x = targetSelection.x =
          innerWidth / 2 - ($analizer.size * $analizer.zoom) / 2;
        $analizer.y = targetSelection.y =
          innerHeight / 2 - $analizer.size * $analizer.zoom;
        targetSelection.zoom = $analizer.zoom;
      };
    };

    input.click();
  } */
</script>

<svelte:window on:resize={handleSize} />

<img
  src="/logo.svg"
  alt="HunterColor logo"
  class="absolute inset-0 h-14 m-auto"
/>

<video
  bind:this={video}
  on:play={animateSelection}
  playsinline
  autoplay
  muted
  class="absolute top-0 left-0 size-full"
  on:click={updateSelection}
>
</video>

<canvas bind:this={canvas} class="pointer-events-none absolute top-0 left-0">
</canvas>

<!-- <button class="fixed bottom-15 right-7 size-6" on:click={loadImage}>
  <Picture class="size-full" />
</button> -->
