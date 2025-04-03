import type { RGB, UserColor, UserColorStorage } from "@/lib/types";
import { toast_messages } from "@/lib/consts";
import { nanoid } from "nanoid";

export function saveColor(color: UserColor) {
  const colorToStore: UserColorStorage = {
    id: nanoid(),
    ...color
  };

  const colors = loadColors();
  colors.push(colorToStore);

  const json = JSON.stringify(colors);
  localStorage.setItem("hc_colors", json);

  toaster(toast_messages.saved);
}

export function loadColors(): UserColorStorage[] {
  const localColors = localStorage.getItem("hc_colors");

  if (localColors) return JSON.parse(localColors);
  else return [];
}

export function deleteColor(color: UserColorStorage) {
  const colors = loadColors();
  const index = colors.findIndex((c) => c.id === color.id);
  colors.splice(index, 1);

  const json = JSON.stringify(colors);
  localStorage.setItem("hc_colors", json);
}

export function shareColor(rgb_values: RGB) {
  const { r, g, b } = rgb_values;
  const shareData = {
    url: `${window.location.href}colors/${r}-${g}-${b}`,
  };

  if (!navigator.share) {
    navigator.clipboard.writeText(shareData.url).then(() => {
      toaster(toast_messages.shared);
    });

    return;
  }

  navigator.share(shareData);
}

export function copyColorValue(color_value: string) {
  navigator.clipboard.writeText(color_value).then(() => {
    toaster(toast_messages.copied);
  });
}

export function toaster(message: string) {
  const toast = document.querySelector("#toast") as HTMLElement;
  const toastParagraph = toast.querySelector("p") as HTMLElement;

  toastParagraph.textContent = message;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 1500);
}