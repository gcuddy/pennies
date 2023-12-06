<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "./utils";

  let { class: className, ...props } = $props<HTMLButtonAttributes>();
</script>

<button class={cn("text-sm py-4 bg-green-400 px-12 rounded-md text-black shadow-sm transition hover:scale-105 focus:scale-105 active:scale-95 disabled:opacity-50", className)} {...props}>
  <slot />
</button>
