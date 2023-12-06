<script lang="ts">
  import { categoriesState, gameStatus } from "$lib/state.svelte";
  import { onMount } from "svelte";
  import "../app.pcss";
  import type { Category } from "$lib/types";
  import Button from "$lib/button.svelte";

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

  {#if gameStatus.gameStatus === 0}
    <slot />
  {:else if gameStatus.gameStatus === 1}
    <h1 class="text-9xl tracking-tighter font-bold">You won!</h1>
  {:else if gameStatus.gameStatus === 2}
    <div>
      The rules: you start with 0 pennies. You can try investing,
      though that might not work and you might lose all your money. A reliable
      way to make money in a capitalist hellscape is to sell your labor power.
      But that's not the most reliable, and it's obviously time consuming. As you go, you have to keep up with the
      rising costs of Food and Rent. You can try to add more budget categories
      if you want, as well. But it might be best to stick to the essentials. You
      can ask for a penny, but you'll only get a few a day. Still, it's not
      nothing. And remember the golden rule: <b>budget all your pennies!</b>.
      Good luck!
    </div>
    <div>You win by getting to 250 pennies.</div>
    <Button onclick={() => gameStatus.gameStatus = 0}>Play</Button>
  {/if}
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
