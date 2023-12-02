<script lang="ts">
	import Grid from './Grid.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { getLevels } from './levels.ts';
	import type { Level, Points, Thumb } from '$lib/types';
	import Found from './Found.svelte';
	import Countdown from './Countdown.svelte';

	let audio_tada: HTMLAudioElement;

	let data = writable([]);

	let difficulty: 'easy' | 'hard' = 'easy';
	let level: Level;
	let found: string[] = [];

	onMount(async () => {
		const response = await fetch('https://api.mamikonyan.io/kargin/data.json');
		$data = await response.json();
	});

	$: {
		const [easyLevel, hardLevel] = getLevels($data);

		if (difficulty === 'easy') {
			level = easyLevel;
		} else {
			level = hardLevel;
		}
	}
</script>

<div class="game">
	<div class="info">
		<Countdown remaining={level.duration} duration={level.duration} />
	</div>

	<div class="grid-container">
		<Grid
			grid={level.thumbs}
			{found}
			on:found={(e) => {
				audio_tada.play();
				const { match } = e.detail.thumb;
				found = [...found, match];
			}}
		/>
	</div>

	<div class="info">
		<Found {found} points={level.points} />
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
		top: 7rem;
	}

	.grid-container {
		height: 60vmin;
		width: 60vmin;
	}

	.info {
		height: 10vmin;
		width: 60vmin;
	}

	@media screen and (min-width: 1024px) {
		.game {
			align-self: flex-start;
		}
	}
</style>
