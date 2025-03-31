import type { RGB } from "@/lib/types";
import colorConverter from "simple-color-converter";

export function rgbToName({ r, g, b }: RGB): string {
  const { color } = new colorConverter({
    rgb: { r, g, b },
    to: "ral"
  });

  return color.name;
}

export function rgbToRgb({ r, g, b }: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHex({ r, g, b }: RGB): string {
  const { color } = new colorConverter({
    rgb: { r, g, b },
    to: "hex",
  });

  return `#${color.toLowerCase()}`;
}

export function rgbToCmyk({ r, g, b }: RGB): string {
  const { color: cmyk } = new colorConverter({
    rgb: { r, g, b },
    to: "cmyk",
  });

  return `${cmyk.c}M ${cmyk.m}Y ${cmyk.y}K ${cmyk.k}K`;
}

export function rgbToPantone({ r, g, b }: RGB): string {
  const { color } = new colorConverter({
    rgb: { r, g, b },
    to: "pantone",
  });

  return color;
}

export function rgbToRal({ r, g, b }: RGB): string {
  const { color: { ral } } = new colorConverter({
    rgb: { r, g, b },
    to: "ral",
  });

  return ral;
}

export function rgbToHsl({ r, g, b }: RGB): string {
  const { color: hsl } = new colorConverter({
    rgb: { r, g, b },
    to: "hsl",
  });

  return `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`;
}

export function rgbToLab({ r, g, b }: RGB): string {
  const { color: lab } = new colorConverter({
    rgb: { r, g, b },
    to: "lab",
  });

  return `lab(${lab.l.toFixed(2)}% ${lab.a.toFixed(2)} ${lab.b.toFixed(2)})`;
}