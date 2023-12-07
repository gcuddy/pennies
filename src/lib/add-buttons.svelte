<script lang="ts">
  import Button from "./button.svelte";
  import LaborPower from "./labor-power.svelte";
  import { gameStatus, pennies, categoriesState } from "./state.svelte";
  import AlertDialog from "./ui/alert-dialog.svelte";

  let { showBankruptcy } = $props();

  function invest() {
    // add between +50 and -50 pennies
    const random = Math.floor(Math.random() * 100) - 50;
    console.log({ random });
    pennies.count = Math.max(0, pennies.count + random);
  }
  function bankrupt() {
    pennies.count = 0;
    categoriesState.categories = categoriesState.categories.map((c) => {
      c.budgeted = 0;
      c.activity = 0;
      return c;
    });
    gameStatus.winCondition += 100;
  }

  let dialog_open = $state(false);
</script>

<div class="flex flex-col">
  <!-- <button onclick={pennies.inc}> add penny </button> -->
  {#if showBankruptcy}
    <Button onclick={bankrupt} class="mt-9">Declare Bankruptcy 😭</Button>
  {/if}

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
