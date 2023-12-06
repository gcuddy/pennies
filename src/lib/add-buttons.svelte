<script lang="ts">
  import Button from "./button.svelte";
  import LaborPower from "./labor-power.svelte";
  import { pennies } from "./state.svelte";
  import AlertDialog from "./ui/alert-dialog.svelte";

  function invest() {
    // add between +50 and -50 pennies
    const random = Math.floor(Math.random() * 100) - 50;
    console.log({ random });
    pennies.count = Math.max(0, pennies.count + random);
  }

  let dialog_open = $state(false);
</script>

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
