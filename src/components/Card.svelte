<script lang="ts">
	import type { Thumb } from '$lib/types';

	export let thumb: Thumb;
	export let flipped: boolean;
	export let isFound: boolean;
	export let disabled: boolean;
</script>

<div class="card" class:flipped>
	<button on:click {disabled} />
	{#if !isFound}
		<div class="item" style="background-image: url({thumb.url})" />
	{/if}
</div>

<style>
	.card {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		border: none;
		background: none;
		cursor: pointer;
	}

	.flipped button {
		background: blue;
	}

	.item {
		background-size: cover;
		width: 100%;
		height: 100%;
		pointer-events: none;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
