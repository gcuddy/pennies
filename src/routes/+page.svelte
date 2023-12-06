<script>
  import Categories from "$lib/categories.svelte";
  import Jar from "$lib/jar.svelte";
</script>

<svelte:head>
  <title>Penny Wise</title>
  <!-- <meta name="description" content="Svelte demo app" /> -->
</svelte:head>

<div class="flex gap-4 justify-between">
  <div class="sm:order-2">
    <Jar />
  </div>
  <Categories />
</div>
