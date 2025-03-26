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
