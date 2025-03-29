import type { RGB } from "@/lib/types";

function fitOnRange({ r, g, b }: RGB) {
  const fit_r = Math.max(0, Math.min(255, r));
  const fit_g = Math.max(0, Math.min(255, g));
  const fit_b = Math.max(0, Math.min(255, b));

  return { fit_r, fit_g, fit_b };
};

export function rgbToHex({ r, g, b }: RGB): string {
  const { fit_r, fit_g, fit_b } = fitOnRange({ r, g, b });
  const toHex = (value: number) => value.toString(16).padStart(2, "0");

  const redHex = toHex(fit_r);
  const greenHex = toHex(fit_g);
  const blueHex = toHex(fit_b);

  return `#${redHex}${greenHex}${blueHex}`;
}

export function rgbToCmyk({ r, g, b }: RGB): string {
  const { fit_r, fit_g, fit_b } = fitOnRange({ r, g, b });
  const toPercentage = (value: number) => value / 255;

  const per_r = toPercentage(fit_r);
  const per_g = toPercentage(fit_g);
  const per_b = toPercentage(fit_b);

  const val_k = 1 - Math.max(per_r, per_g, per_b);
  const val_c = val_k === 1 ? 0 : (1 - per_r - val_k) / (1 - val_k);
  const val_m = val_k === 1 ? 0 : (1 - per_g - val_k) / (1 - val_k);
  const val_y = val_k === 1 ? 0 : (1 - per_b - val_k) / (1 - val_k);

  const c = Math.round(val_c * 100);
  const m = Math.round(val_m * 100);
  const y = Math.round(val_y * 100);
  const k = Math.round(val_k * 100);

  return `${c}C ${m}M ${y}Y ${k}K`;
}

export function getColorName({ r, g, b }: RGB): string {
  const colors = [
    { name: "Negro", rgb: { r: 0, g: 0, b: 0 } },
    { name: "Blanco", rgb: { r: 255, g: 255, b: 255 } },
    { name: "Rojo", rgb: { r: 255, g: 0, b: 0 } },
    { name: "Verde", rgb: { r: 0, g: 255, b: 0 } },
    { name: "Azul", rgb: { r: 0, g: 0, b: 255 } },
    { name: "Amarillo", rgb: { r: 255, g: 255, b: 0 } },
    { name: "Cian", rgb: { r: 0, g: 255, b: 255 } },
    { name: "Magenta", rgb: { r: 255, g: 0, b: 255 } },
    { name: "Gris", rgb: { r: 128, g: 128, b: 128 } },
    { name: "Naranja", rgb: { r: 255, g: 165, b: 0 } },
    { name: "Rosa", rgb: { r: 255, g: 192, b: 203 } }
  ];

  const closest = colors.reduce((prev, curr) => {
    const prevDiff = colorDistance({ r, g, b }, prev.rgb);
    const currDiff = colorDistance({ r, g, b }, curr.rgb);
    return currDiff < prevDiff ? curr : prev;
  });

  const brightness = getBrightness({ r, g, b });
  if (brightness < 85) return `${closest.name} oscuro`;
  if (brightness > 170) return `${closest.name} claro`;
  return closest.name;
}

function colorDistance({ r, g, b }: RGB, color: RGB) {
  return Math.sqrt(
    Math.pow(r - color.r, 2) +
    Math.pow(g - color.g, 2) +
    Math.pow(b - color.b, 2)
  );
}

function getBrightness({ r, g, b }: RGB) {
  return (r * 0.299 + g * 0.587 + b * 0.114);
}
