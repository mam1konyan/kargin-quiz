<script lang="ts">
	import Grid from './Grid.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { getLevels } from './levels.ts';
	import type { Level, Points, Thumb } from '$lib/types';
	import Found from './Found.svelte';

	let audio_tada: HTMLAudioElement;

	let data = writable([]);

	let difficulty: 'easy' | 'hard' = 'easy';
	let grid: Thumb[];
	let points: Points;

	let found: string[] = [];

	onMount(async () => {
		const response = await fetch('https://api.mamikonyan.io/kargin/data.json');
		$data = await response.json();
	});

	$: {
		const [easyLevel, hardLevel] = getLevels($data);

		if (difficulty === 'easy') {
			grid = easyLevel.thumbs;
			points = easyLevel.points;
		} else {
			grid = hardLevel.thumbs;
			points = hardLevel.points;
		}
	}
</script>

<div class="game">
	<div class="info"></div>

	<div class="grid-container">
		<Grid
			{grid}
			{found}
			on:found={(e) => {
				audio_tada.play();
				const { match } = e.detail.thumb;
				found = [...found, match];
			}}
		/>
	</div>

	<div class="info">
		<Found {found} {points} />
	</div>
	<audio src="https://api.mamikonyan.io/assets/tada.mp3" bind:this={audio_tada} />
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 60vmin;

		position: sticky;
		top: 6rem;
	}

	.grid-container {
		height: 60vmin;
		width: 60vmin;
	}

	.info {
		height: 10vmin;
		width: 60vmin;
		background-color: red;
	}

	@media screen and (min-width: 1024px) {
		.game {
			align-self: flex-start;
		}
	}
</style>
