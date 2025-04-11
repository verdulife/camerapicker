import type { UserColor, UserColorStorage, UserColorUrl } from "@/lib/types";
import { nanoid } from "nanoid";
import { toast_messages } from "@/lib/consts";
import { rgbToHsl } from "@/lib/colors";

export function saveView(grid: boolean) {
  const json = JSON.stringify({ grid });
  localStorage.setItem("hc_view", json);
}

export function loadView(): boolean {
  const localView = localStorage.getItem("hc_view");

  if (localView) return JSON.parse(localView).grid;
  else return true;
}

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

export function updateColor(color: UserColorStorage) {
  const colors = loadColors();
  const index = colors.findIndex((c) => c.id === color.id);
  colors[index] = color;

  const json = JSON.stringify(colors);
  localStorage.setItem("hc_colors", json);
  toaster(toast_messages.updated);
}

export function deleteColor(color: UserColorStorage) {
  const colors = loadColors();
  const index = colors.findIndex((c) => c.id === color.id);
  colors.splice(index, 1);

  const json = JSON.stringify(colors);
  localStorage.setItem("hc_colors", json);
}

export function shareColor(color: UserColor) {
  const { origin } = window.location;
  const shareData = {
    url: `${origin}/${userColorToUrl(color)}`,
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

export function userColorToUrl({ name, rgb, id }: UserColorUrl) {
  const { r, g, b } = rgb;
  return `colors/color?name=${name}&rgb=${r}-${g}-${b}&id=${id}`;
}

export function sortByColor(a: UserColorStorage, b: UserColorStorage) {
  const ahsl = rgbToHsl(a.rgb);
  const bhsl = rgbToHsl(b.rgb);

  const aHue = ahsl.split(" ")[0];
  const bHue = bhsl.split(" ")[0];

  if (aHue < bHue) return -1;
  if (aHue > bHue) return 1;

  return 0;
}