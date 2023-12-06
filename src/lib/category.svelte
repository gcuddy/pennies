<script lang="ts">
  import type { Category } from "./types";
  import { cn } from "./utils";

  let { category, activity, budgeted } = $props<Category>();
</script>

<div class="grid grid-cols-3 gap-4">
  <div role="cell" class=" w-40">{category}</div>
  <div role="cell" class="w-20">
    <input class="bg-white rounded-lg text-center w-full" type="text" bind:value={budgeted} />
  </div>
  <div role="cell" class=" w-20">
    <span class={cn("bg-white border rounded-full p-2", Math.floor(activity) > budgeted && "bg-red-400")}>
        {Math.floor(activity)}
    </span>
    <!-- <input class="bg-white rounded-lg text-center w-full" type="text" bind:value={activity} /> -->
  </div>
</div>
