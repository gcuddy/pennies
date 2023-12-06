<script lang="ts">
  import type { Category as TCategory } from "./types";
  import Category from "./category.svelte";

  let categories = $state<TCategory[]>([]);

  function addCategory(category: string) {
    categories.push({
      category,
      activity: 0,
      budgeted: 0,
    });
  }

  let value = $state("");
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    addCategory(value);
    console.log(e);
    value = "";
  }}
  class="flex gap-2"
>
  <input
    class="text-lg border bg-transparent rounded p-4"
    bind:value
    type="text"
  />
  <button>Add</button>
</form>

{#each categories as category}
  <div>
    <Category {...category} />
  </div>
{/each}
