<script>
	import Card from './Card.svelte';
</script>

<div class="grid">
	{#each Array(16) as singleCard}
		<Card />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 1px;
		height: 100%;
	}
</style>
