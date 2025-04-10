import { writable } from "svelte/store";

export const rgb_values = writable({ r: 0, g: 0, b: 0 });
export const analizer = writable({ x: 0, y: 0, size: 65, zoom: 1.5 });
export const previewState = writable(false);
export const palette = writable([{ r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0 }]);