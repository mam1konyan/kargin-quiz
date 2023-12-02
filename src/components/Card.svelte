<script lang="ts">
	import type { Thumb } from '$lib/types';

	export let thumb: Thumb;
	export let flipped: boolean;
	export let isFound: boolean;
</script>

<div class="card" class:flipped>
	<button on:click />
	{#if !isFound}
		<div class="item" style="background-image: url({thumb.url})" />
	{/if}
</div>

<style>
	.card {
		display: flex;
		justify-content: center;
		align-items: center;
		background: yellow;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.flipped button {
		background: blue;
	}

	.item {
		background-size: cover;
		width: 80%;
		height: 80%;
		pointer-events: none;
	}
</style>
