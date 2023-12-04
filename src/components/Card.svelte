<script lang="ts">
	import type { Thumb } from '$lib/types';
	import { send } from './transitions';

	export let thumb: Thumb;
	export let flipped: boolean;
	export let isFound: boolean;
	export let guessed: boolean;
	export let group: 'a' | 'b';
</script>

<div class="card" class:flipped={guessed || flipped}>
	{#if !isFound}
		<button on:click />
		<div class="item" style="--url: url({thumb?.url || ''})" />
	{/if}
	{#if guessed}
		<div class="guessed" out:send={{ key: `${thumb?.match || ''}:${group}` }}>🎉</div>
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
		font-size: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		user-select: none;
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

	@media screen and (min-width: 1025px) {
		.guessed {
			font-size: 3rem;
		}
	}
</style>
