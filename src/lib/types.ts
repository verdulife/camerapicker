export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type ColorSpace = "rgb" | "hex" | "cmyk";

export interface UserColor {
  id: string;
  name: string;
  rgb: RGB;
}