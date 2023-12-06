<script>
  import Categories from "$lib/categories.svelte";
  import Jar from "$lib/jar.svelte";
</script>

<svelte:head>
  <title>Pennies</title>
  <!-- <meta name="description" content="Svelte demo app" /> -->
</svelte:head>

<div class="flex gap-4 max-sm:flex-col max-sm:items-center justify-between">
  <div class="sm:order-2">
    <Jar />
  </div>
  <Categories />
</div>
