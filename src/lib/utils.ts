import type { ColorSpace } from "@/lib/types";

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export function saveColorSpace(colorSpace: ColorSpace) {
  localStorage.setItem("ColorSpace", colorSpace);
}

export function loadColorSpace(): ColorSpace {
  const localColorSpace = localStorage.getItem("ColorSpace") as ColorSpace;

  if (localColorSpace) return localColorSpace;
  else return "rgb";
}