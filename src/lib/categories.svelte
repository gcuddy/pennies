<script lang="ts">
  import type { Category as TCategory } from "./types";
  import Category from "./category.svelte";
  import Button from "./button.svelte";
  import {
    categoriesState,
    isSellingLaborPower,
    pennies,
    pennyCount,
  } from "./state.svelte";
  import AddButtons from "./add-buttons.svelte";
  import { DAILY_FOOD, DAILY_RENT } from "./constants";

  let { categories, addCategory, total_budgeted } = categoriesState;

  //   let d = $derived(
  //     categories.reduce((acc, { budgeted }) => +acc + +budgeted, 0)
  //   );

  let value = $state("");

  let inDebt = $derived(
    categoriesState.categories.some((c) => Math.floor(+c.activity) > +c.budgeted)
  );

  let activity_interval: ReturnType<typeof setInterval>;
  $effect(() => {
    activity_interval = setInterval(() => {
      categories.forEach((category) => {
        if (category.category.toLowerCase() === "rent") {
          category.activity += DAILY_RENT / 24 / 60 / 60;
        } else if (category.category.toLowerCase() === "food") {
          category.activity += DAILY_FOOD / 24 / 60 / 60;
        }
      });
    }, 1000);

    return () => clearInterval(activity_interval);
  });

  //   let remaining = $derived(pennies.count - total_budgeted)

  function remaining() {
    console.log("remaining");
    return pennies.count - total_budgeted();
  }

  let shouldInvest = $derived(remaining() < 0);

  let needToBudget = $state(false);

  let needToBudgetTimeout: ReturnType<typeof setTimeout>;
  $effect(() => {
    if (remaining() > 0) {
      needToBudgetTimeout = setTimeout(() => {
        console.log("need to budget");
        needToBudget = true;
      }, 5000);
    } else {
      needToBudget = false;
      clearTimeout(needToBudgetTimeout);
    }
    return () => clearTimeout(needToBudgetTimeout);
  });

  let pennyDecrementerInterval: ReturnType<typeof setInterval>;
  let pennyDecrementerCountdown = $state(5);
  let isDecrementingPennies = $state(false);
  $effect(() => {
    if ((needToBudget || inDebt) && !isSellingLaborPower.isSellingLaborPower) {
      pennyDecrementerInterval = setInterval(() => {
        // console.log("decrementing pennies");
        // pennies.count--;
        pennyDecrementerCountdown--;
      }, 1000);
    } else {
      clearInterval(pennyDecrementerInterval);
      pennyDecrementerCountdown = 5;
    }

    return () => clearInterval(pennyDecrementerInterval);
  });

  $effect(() => {
    if (pennyDecrementerCountdown <= 0) {
      console.log("pennyDecrementerCountdown <= 0");
      isDecrementingPennies = true;
    } else {
      isDecrementingPennies = false;
    }
  });

  let isDecrementingPenniesInterval: ReturnType<typeof setInterval>;

  $effect(() => {
    if (isDecrementingPennies) {
      console.log("isDecrementingPennies");
      isDecrementingPenniesInterval = setInterval(() => {
        pennies.count--;
      }, 1000);
    } else {
      clearInterval(isDecrementingPenniesInterval);
    }
    return () => clearInterval(isDecrementingPenniesInterval);
  });

  let interval: ReturnType<typeof setInterval>;
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

  $effect(() => {
    console.log("categories changed");
    console.log({ categories });
  });
</script>

<div class="flex flex-col h-fit">
  <span class="text-xl"> You have: {remaining()} pennies remaining!</span>
  {#if remaining() > 0}
    <span> Make sure you budget all your pennies! </span>
    {#if needToBudget}
      <span>
        If you don't, you'll lose them in {pennyDecrementerCountdown} seconds!
      </span>
    {/if}
  {/if}
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
  <!-- {d} -->
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

  {#if inDebt}
    <span class="py-2 text-red-500">
        You're in debt! You need to budget more!
    </span>
  {/if}
  <span class="pt-8">total budgeted: {total_budgeted()}</span>
  <AddButtons />
</div>
