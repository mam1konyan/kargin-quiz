<script lang="ts">
	import Card from './Card.svelte';
	import type { Thumb } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let grid: Thumb[];
	export let found: string[];
	export let guessed: string;

	const dispatch = createEventDispatcher();

	let a: number = -1;
	let b: number = -1;
	let timeoutId: number;
	let matchesArr: string[] = [];

	$: matchesArr = grid.map((a) => a?.match || '');
</script>

<div class="grid">
	{#each grid as thumb, i}
		<Card
			{thumb}
			guessed={thumb ? guessed === thumb.match : false}
			on:click={() => {
				// Resetting setTimeout() here
				clearTimeout(timeoutId);

				if (a === -1 && b === -1) {
					// Nothing selected case
					a = i;
				} else if (b === -1) {
					b = i;
					if (grid[a].match === grid[b].match) {
						// Correct flipped case
						dispatch('found', { thumb });
					} else {
						// Incorrect flipped case, reset after 1 second
						timeoutId = setTimeout(() => {
							a = b = -1;
						}, 1200);
					}
				} else {
					b = -1;
					a = i;
				}
			}}
			flipped={a === i || b === i}
			isFound={thumb ? found.includes(thumb.match) : false}
			group={matchesArr.indexOf(thumb?.match || '') === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		gap: 1rem;
		height: 100%;
		perspective: 100vw;
	}
</style>
