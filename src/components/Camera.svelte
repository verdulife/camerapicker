<script lang="ts">
  import { onMount } from "svelte";
  import { isTouchDevice } from "@/lib/consts";
  import { analizer } from "@/lib/stores";
  import { drawAnalizer } from "@/lib/analizer";

  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;
  let analizerCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null,
    analizerCtx: CanvasRenderingContext2D | null;

  onMount(async () => {
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
  });

  function handleSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    analizerCanvas.width = $analizer.size;
    analizerCanvas.height = $analizer.size;

    $analizer.x = innerWidth / 2 - ($analizer.size * $analizer.zoom) / 2;
    $analizer.y = innerHeight / 2 - $analizer.size * $analizer.zoom;
  }

  function animateSelection() {
    handleSize();
    drawAnalizer(ctx, analizerCtx, $analizer, video, analizerCanvas);
    requestAnimationFrame(animateSelection);
    /*
    analyzeColor(); */
  }
</script>

<video
  bind:this={video}
  on:play={animateSelection}
  playsinline
  autoplay
  muted
  class="absolute top-0 left-0 size-full"
>
</video>
<canvas bind:this={canvas} class="pointer-events-none absolute top-0 left-0">
</canvas>
