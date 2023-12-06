<script lang="ts">
  import { melt } from "@melt-ui/svelte";
  import Button from "./button.svelte";
  import { pennyCount, pennies, categoriesState } from "./state.svelte";
  import AlertDialog from "./ui/alert-dialog.svelte";
  import { cn } from "./utils";
  import LaborPower from "./labor-power.svelte";

  function invest() {
    // add between +50 and -50 pennies
    const random = Math.floor(Math.random() * 100) - 50;
    console.log({ random });
    pennies.count = Math.max(0, pennies.count + random);
  }

  let dialog_open = $state(false);

  function housing() {
    return Number(
      categoriesState.categories.find(
        (c) => c.category.toLowerCase() === "rent"
      )?.budgeted ?? 0
    );
  }

  function food() {
    return Number(
      categoriesState.categories.find(
        (c) => c.category.toLowerCase() === "food"
      )?.budgeted ?? 0
    );
  }
</script>

<div
  class="h-[75vh] relative w-72 overflow-hidden border-4 rounded-t-3xl rounded-b-lg border-black grid grid-cols-12 place-content-end"
>
  <!--  -->
  {#if pennies.count - categoriesState.total_budgeted() < 0}
    <div class="absolute w-full h-full bg-red-400/50 grid place-content-center">
      <span
        >Oh no! You've over budgeted by {Math.abs(
          pennies.count - categoriesState.total_budgeted()
        )} pennies :~(</span
      >
    </div>
  {/if}

  {#each Array(housing() ?? 0) as _}
    <div
      class={cn(
        "rounded-full h-6 w-6"
        // categoriesState.total_budgeted() > i && "bg-orange-800/25 border-2"
      )}
    >
      🏠
    </div>
  {/each}
  {#each Array(food() ?? 0) as _}
    <div
      class={cn(
        "rounded-full h-6 w-6"
        // categoriesState.total_budgeted() > i && "bg-orange-800/25 border-2"
      )}
    >
      🥬
    </div>
  {/each}

  {#each Array(Math.max(0, categoriesState.total_budgeted() - housing() - food())) as _, i}
    <div class={cn("rounded-full h-6 w-6 ", "bg-orange-800/25 border-2")} />
  {/each}

  {#each Array(Math.max(0, pennies.count - categoriesState.total_budgeted())) as _, i}
    <div
      class={cn(
        "rounded-full h-6 w-6 bg-orange-800"
        // categoriesState.total_budgeted() > i && "bg-orange-800/25 border-2"
      )}
    />
  {/each}
</div>

<div class="flex flex-col">
  <button onclick={pennies.inc}> add penny </button>

  <Button onclick={invest} class="mt-9">INVEST !!!!!</Button>
  <Button
    onclick={() => {
      dialog_open = true;
    }}
    class="mt-9">SELL YOUR LABOR-POWER</Button
  >
</div>

<AlertDialog bind:open={dialog_open} title="SELL YOUR LABOR POWER">
  <LaborPower />
</AlertDialog>
