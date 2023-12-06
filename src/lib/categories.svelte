<script lang="ts">
  import type { Category as TCategory } from "./types";
  import Category from "./category.svelte";
  import Button from "./button.svelte";
  import { categoriesState, pennies, pennyCount } from "./state.svelte";

  let {
    categories,
    addCategory,
    total_budgeted
  } = categoriesState

  let value = $state("");

  //   let remaining = $derived(pennies.count - total_budgeted)

  function remaining() {
    console.log("remaining");
    return pennies.count - total_budgeted;
  }

  let shouldInvest = $derived(remaining() < 0);

  let interval;
  $effect(() => {
    if (shouldInvest) {
      interval = setInterval(() => {
        console.log("should invest");
        const random = Math.floor(Math.random() * 100) - 60;
        console.log({ random });
        pennies.count = Math.max(0, pennies.count + random);
      }, 1000);
    }
    return () => clearInterval(interval);
  });
</script>

<div class="flex flex-col">
  <span class="text-xl"> You have: {remaining()} pennies remaining!</span>
  {#if shouldInvest}
    <span class="my-4 text-lg font-bold text-red-500"
      >You've budgeted too much!!! Let's start autoinvesting.</span
    >
  {/if}
  <form
    onsubmit={(e) => {
      e.preventDefault();
      if (!value) return;
      addCategory(value);
      console.log(e);
      value = "";
    }}
    class="flex gap-2"
  >
    <input
      class="text-lg border bg-transparent rounded p-4"
      bind:value
      placeholder="New category"
      type="text"
    />
    <Button disabled={!value}>Add</Button>
  </form>

  <div class="grid grid-cols-3">
    <span class="w-40">name</span>
    <span class="w-20">budgeted</span>
    <span class="w-20">activity</span>
  </div>

  <div class="pt-4 flex flex-col gap-4">
    {#each categories as { category, budgeted, activity }}
      <Category {category} bind:budgeted bind:activity />
    {/each}
  </div>
  <span>total budgeted: {total_budgeted}</span>
</div>
