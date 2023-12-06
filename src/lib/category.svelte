<script lang="ts">
  import type { Category } from "./types";

  let { category, activity, budgeted } = $props<Category>();
</script>

<div class="grid grid-cols-3 gap-4">
  <div role="cell" class=" w-40">{category}</div>
  <div role="cell" class="w-20">
    <input class="bg-white rounded-lg text-center w-full" type="text" bind:value={budgeted} />
  </div>
  <div role="cell" class=" w-20">
    <input class="bg-white rounded-lg text-center w-full" type="text" bind:value={activity} />
  </div>
</div>
