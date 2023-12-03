<script lang="ts">
	import type { Points } from '$lib/types';
	import { receive } from './transitions';

	export let found: string[];
	export let points: Points;
</script>

<div class="found">
	<div class="count">{found.length * points.correct}</div>
	<div class="found-items">
		{#each found as trophy (trophy)}
			<div class="pair">
				<span in:receive={{ key: `${trophy}:a` }}>🎉</span>
				<span in:receive={{ key: `${trophy}:b` }}>🎉</span>
			</div>
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
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.pair {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
	}

	span {
		position: absolute;
	}

	.found-items {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		gap: 2px;
		width: 80%;
		height: 100%;
	}

	@media screen and (min-width: 1024px) {
		.found-items {
			font-size: 2rem;
		}

		.count {
			font-size: 4rem;
		}

		.pair {
			width: 3rem;
			height: 3rem;
		}
	}
</style>
