<script lang="ts">
	let categories = $state<string[]>([]);

	function addCategory(category: string) {
		categories.push(category);
	}

	let value = $state('');
</script>

<form
	onsubmit={(e) => {
        e.preventDefault();
		addCategory(value);
		console.log(e);
		value = '';
	}}
    class="flex gap-2"
>
    <input class="text-lg border bg-transparent rounded p-4" bind:value type="text" />
	<button>Add</button>
</form>

{#each categories as category}
	<div>
		{category}
	</div>
{/each}
