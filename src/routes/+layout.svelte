<script lang="ts">
  import { categoriesState } from "$lib/state.svelte";
  import { onMount } from "svelte";
  import "../app.pcss";
  import type { Category } from "$lib/types";

  let mounted = $state(false);

  $effect(() => {
    if (!mounted) {
      const stored_categories = localStorage.getItem("categories");
      if (stored_categories) {
        const { categories } = JSON.parse(stored_categories) as {
          categories: Category[];
        };
        console.log("got categories", categories);
        // categoriesState.categories = categories;
        // categoriesState.categories = categories.map((c) => ({
        //   ...c,
        //   budgeted: +c.budgeted,
        //   activity: +c.budgeted,
        // }));
        // categoriesState.categories = JSON.parse(categories);
      }
      mounted = true;
    } else {
      console.log("saving categories", categoriesState.categories);
      localStorage.setItem("categories", JSON.stringify(categoriesState));
    }
  });

  //   onMount(() => {
  //     const categories = localStorage.getItem("categories");
  //     if (categories) {
  //       categoriesState.categories = JSON.parse(categories);
  //     }
  //   });
</script>

<div class="app container mx-auto py-4">
  <h1>Pennies</h1>
  <slot />
</div>

<style>
  h1 {
    @apply font-bold tracking-tight text-green-600;
    font-size: clamp(3rem, 10vw, 5rem);
  }
  :global(body) {
    @apply bg-slate-100;
  }
</style>
