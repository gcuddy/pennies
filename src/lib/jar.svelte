<script lang="ts">
  import { categoriesState, gameStatus, pennies } from "./state.svelte";
  import { cn } from "./utils";

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

  let height = $state(0);
  $effect(() => {
    if (pennies.count >= gameStatus.winCondition) {
      // you won
      gameStatus.gameStatus = 1;
    }
  });
</script>

<div
  bind:clientHeight={height}
  class="h-[75vh] relative w-72 border-4 rounded-t-3xl rounded-b-lg border-black grid grid-cols-12 place-content-end"
>
  <!--  -->
  {#if pennies.count - categoriesState.total_budgeted() < 0}
    <div
      class="absolute w-full rounded-[inherit] h-full bg-red-400/50 grid place-content-center"
    >
      <span
        >Oh no! You've over budgeted by {Math.abs(
          pennies.count - categoriesState.total_budgeted()
        )} pennies :~(</span
      >
    </div>
  {:else}
    <div class="absolute w-full h-full grid place-content-center">
      <div class="flex flex-col w-fit h-fit bg-white/75 rounded-lg p-2">
          <span>You have: {pennies.count} pennies</span>
          <span>Goal: {gameStatus.winCondition} pennies</span>
      </div>
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
</div>
