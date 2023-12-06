<script lang="ts">
  import { pennies } from "./state.svelte";

  let interval: ReturnType<typeof setInterval>;

  let seconds = $state(0);

  let penny_count = $state(0);
  let penny_threshold = $state(1);

  $effect(() => {
    interval = setInterval(() => {
      penny_count += (1 / 60) * (1 / 60) * 725;
      console.log({ penny_count, penny_threshold });
      if (penny_count > penny_threshold) {
        pennies.count += 1;
        penny_threshold += 1;
      }
      seconds += 1;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="flex flex-col">
  <span
    >{seconds} seconds have passed since you started selling your labor-power. You
    have earned {Math.floor(penny_count)} pennies. You now have: {pennies.count}
    pennies.</span
  >

  <span>Note: The current minimum wage is 725 pennies an hour.</span>
</div>
