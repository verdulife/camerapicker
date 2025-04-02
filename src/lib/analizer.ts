export function drawAnalizer(
  ctx: CanvasRenderingContext2D | null,
  analizerCtx: CanvasRenderingContext2D | null,
  selection: { x: number; y: number; size: number; zoom: number },
  video: HTMLVideoElement,
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

  // Analizar video
  analizerCtx.drawImage(
    video,
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