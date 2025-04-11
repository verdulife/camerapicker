<script>
  import { rgbToRgb } from "@/lib/colors";
  import { userColorToUrl } from "@/lib/utils";

  export let color, grid;

  const { id, name, rgb } = color;
  const rgbOut = rgbToRgb(rgb);
</script>

<article
  id={`hc_${id}`}
  class="w-full rounded-xl border border-neutral-800/10 bg-white p-2 shadow"
>
  <a
    href={userColorToUrl(color)}
    aria-label={name}
    class="flex w-full {grid && 'flex-col'} items-center gap-2"
  >
    <figure
      style={`background-color: ${rgbOut}`}
      class="aspect-square {grid
        ? 'w-full'
        : 'w-18'} rounded-md border border-neutral-800/10"
    ></figure>

    <footer class="flex w-full flex-col text-left text-neutral-800">
      <h2 class="font-bold">{name}</h2>
      <p class="text-sm">{rgbOut}</p>
    </footer>
  </a>
</article>
