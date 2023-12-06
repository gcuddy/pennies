<script lang="ts">
  import type { Category } from "./types";

  let { category, activity, budgeted } = $props<Category>();
</script>

<div class="flex">
  <div role="cell">{category}</div>
  <div role="cell">
    <input type="number" bind:value={budgeted} />
  </div>
  <div role="cell">
    <input type="number" bind:value={activity} />
  </div>
</div>
