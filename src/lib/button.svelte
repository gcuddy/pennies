<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "./utils";

  let { class: className, ...props } = $props<HTMLButtonAttributes>();
</script>

<button class={cn("text-sm py-4 bg-green-400", className)} {...props}>
  <slot />
</button>
