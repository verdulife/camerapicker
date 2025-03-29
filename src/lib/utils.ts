import type { ColorSpace, UserColor } from "@/lib/types";

export const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export function saveColorSpace(colorSpace: ColorSpace) {
  localStorage.setItem("hc_colorspace", colorSpace);
}

export function loadColorSpace(): ColorSpace {
  const localColorSpace = localStorage.getItem("hc_colorspace") as ColorSpace;

  if (localColorSpace) return localColorSpace;
  else return "rgb";
}

export function saveColor(color: UserColor) {
  let colors = loadColors();
  colors.push(color);
  const json = JSON.stringify(colors);
  localStorage.setItem("hc_colors", json);
}

export function loadColors(): UserColor[] {
  const localColors = localStorage.getItem("hc_colors");

  if (localColors) return JSON.parse(localColors);
  else return [];
}

export function toaster(message: string) {
  const toast = document.querySelector("#toast") as HTMLElement;
  const toastParagraph = toast.querySelector("p") as HTMLElement;

  toastParagraph.textContent = message;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 2000);
}