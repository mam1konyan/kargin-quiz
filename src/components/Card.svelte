<script lang="ts">
	import type { Thumb } from '$lib/types';

	export let thumb: Thumb;
	export let flipped: boolean;
	export let isFound: boolean;
	export let guessed: boolean;
</script>

<div class="card" class:flipped={guessed || flipped}>
	{#if !isFound}
		{#if guessed}
			<div class="guessed">🎉</div>
		{/if}
		<button on:click />
		<div class="item" style="--url: url({thumb.url})" />
	{/if}
</div>

<style>
	.card {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
		backface-visibility: hidden;
		border-radius: 50%;
		border: none;
		background: linear-gradient(to right, #159957, #155799);
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.guessed {
		position: absolute;
		z-index: 1;
		font-size: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-image: radial-gradient(
			circle,
			rgba(236, 240, 241, 0.6) 0%,
			rgba(189, 195, 199, 0.6) 100%
		);
		border-radius: 50%;
		user-select: none;
		transform: rotateY(180deg);
	}

	.item {
		background-image: var(--url);
		background-size: cover;
		width: 100%;
		height: 100%;
		pointer-events: none;
		border-radius: 50%;
		cursor: pointer;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
</style>
