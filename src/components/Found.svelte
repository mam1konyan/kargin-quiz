<script lang="ts">
	import type { Points } from '$lib/types';

	export let found: string[];
	export let points: Points;
</script>

<div class="found">
	<div class="count">{found.length * points.correct}</div>
	<div class="found-items">
		{#each found as trophy (trophy)}
			<span>🎉</span>
		{/each}
	</div>
</div>

<style>
	.found {
		display: flex;
		height: 100%;
	}

	.count {
		height: 100%;
		width: 20%;
		font-size: 4rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	span {
		margin: 0.5rem;
	}

	.found-items {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		gap: 2px;
		width: 80%;
		height: 100%;
	}
</style>
