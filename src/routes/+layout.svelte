<script>
  import "../app.pcss";
</script>

<div class="app container mx-auto py-4">
    <h1>Penny Wise</h1>
    <slot />
</div>

<style>
    h1 {
        @apply font-bold tracking-tight text-green-600;
        font-size: clamp(3rem, 10vw, 5rem)
    }
    :global(body) {
        @apply bg-slate-100;
    }
</style>
