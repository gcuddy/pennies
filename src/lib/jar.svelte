<script lang="ts">
  import Button from "./button.svelte";
  import { pennyCount, pennies, categoriesState } from "./state.svelte";

  function invest() {
    // add between +50 and -50 pennies
    const random = Math.floor(Math.random() * 100) - 50;
    console.log({ random });
    pennies.count = Math.max(0, pennies.count + random);
  }



</script>

<div
  class="h-[75vh] w-72 border-4 rounded-t-3xl rounded-b-lg border-black grid grid-cols-12 place-content-end"
>
  <!--  -->

  {#each Array(pennies.count - categoriesState.total_budgeted) as _}
    <div class="rounded-full h-6 w-6 bg-orange-800" />
  {/each}
</div>

<div class="flex flex-col">
  <button onclick={pennies.inc}> add penny </button>

  <Button onclick={invest} class="mt-9">INVEST !!!!!</Button>
  <Button onclick={invest} class="mt-9">SELL YOUR LABOR-POWER</Button>
</div>
