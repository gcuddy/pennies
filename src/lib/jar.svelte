<script lang="ts">
  import { pennyCount, pennies } from "./state.svelte";
</script>

<div class="h-56 w-40 border-4 rounded-t-3xl rounded-b-lg grid grid-cols-8 place-content-end ">
  <!--  -->

  {#each Array(pennies.count) as _}
    <div class="rounded-full h-6 w-6 bg-orange-800" />
  {/each}
</div>

<button onclick={pennies.inc}> add penny </button>
