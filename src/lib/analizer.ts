import ColorThief from "colorthief";
import type { RGB } from "@/lib/types";

export function drawAnalizer(
  ctx: CanvasRenderingContext2D | null,
  analizerCtx: CanvasRenderingContext2D | null,
  selection: { x: number; y: number; size: number; zoom: number },
  canvasSource: HTMLVideoElement | HTMLImageElement,
  analizerCanvas: HTMLCanvasElement
) {
  if (!ctx || !analizerCtx) return;
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  analizerCtx.save();
  analizerCtx.beginPath();

  // Analizer wrapper
  analizerCtx.arc(
    analizerCanvas.width / 2,
    analizerCanvas.height / 2,
    analizerCanvas.width / 2,
    0,
    Math.PI * 2
  );

  analizerCtx.closePath();
  analizerCtx.clip();

  // Analizer video
  analizerCtx.drawImage(
    canvasSource,
    selection.x + selection.size / 2,
    selection.y + selection.size / 2,
    selection.size,
    selection.size,
    0,
    0,
    analizerCanvas.width * selection.zoom,
    analizerCanvas.height * selection.zoom
  );

  analizerCtx.restore();
  analizerCtx.strokeStyle = "white";
  analizerCtx.lineWidth = 1;
  analizerCtx.beginPath();
  analizerCtx.arc(
    analizerCanvas.width / 2,
    analizerCanvas.height / 2,
    analizerCanvas.width / 2,
    0,
    Math.PI * 2
  );
  analizerCtx.stroke();

  analizerCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  analizerCtx.lineWidth = 0.4;

  const gridSize = 6;
  const numLinesX = analizerCanvas.width / gridSize;
  const numLinesY = analizerCanvas.height / gridSize;

  for (let i = 0; i <= numLinesX; i++) {
    analizerCtx.beginPath();
    analizerCtx.moveTo(i * gridSize, 0);
    analizerCtx.lineTo(i * gridSize, analizerCanvas.height);
    analizerCtx.stroke();
  }

  for (let i = 0; i <= numLinesY; i++) {
    analizerCtx.beginPath();
    analizerCtx.moveTo(0, i * gridSize);
    analizerCtx.lineTo(analizerCanvas.width, i * gridSize);
    analizerCtx.stroke();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(
    selection.x + (selection.size * selection.zoom) / 2,
    selection.y + (selection.size * selection.zoom) / 2,
    (selection.size * selection.zoom) / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(
    analizerCanvas,
    selection.x,
    selection.y,
    selection.size * selection.zoom,
    selection.size * selection.zoom
  );
  ctx.restore();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(
    selection.x + (selection.size * selection.zoom) / 2,
    selection.y + (selection.size * selection.zoom) / 2,
    (selection.size * selection.zoom) / 2,
    0,
    Math.PI * 2
  );
  ctx.stroke();
}

export async function analyzeColorToDominant(
  ctx: CanvasRenderingContext2D | null,
  selection: { x: number; y: number; size: number; zoom: number },
  analizerCanvas: HTMLCanvasElement
): Promise<RGB | undefined> {
  if (!ctx) return;

  ctx.getImageData(selection.x, selection.y, selection.size, selection.size);

  const img = new Image();
  img.src = analizerCanvas.toDataURL();

  return new Promise((resolve) => {
    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img, 1)!;

      resolve({ r, g, b });
    };
  });
}

export async function analyzeColorToPalette(
  ctx: CanvasRenderingContext2D | null,
  selection: { x: number; y: number; size: number; zoom: number },
  analizerCanvas: HTMLCanvasElement
): Promise<Array<RGB> | undefined> {
  if (!ctx) return;

  ctx.getImageData(selection.x, selection.y, selection.size, selection.size);

  const img = new Image();
  img.src = analizerCanvas.toDataURL();

  return new Promise((resolve) => {
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5, 1)!;
      const colors = palette.map(([r, g, b]) => ({ r, g, b }));

      resolve(colors);
    };
  });
}