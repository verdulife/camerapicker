// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: "https://huntercolor.vercel.app/",

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
  integrations: [svelte()]
});