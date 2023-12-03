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
	let guessed: string = '';

	let remaining: number;
	let duration: number;

	let isPlaying: boolean = false;

	onMount(async () => {
		const response = await fetch('https://api.mamikonyan.io/kargin/data.json');
		$data = await response.json();

		countdown();
	});

	$: {
		const [easyLevel, hardLevel] = getLevels($data);

		level = difficulty === 'easy' ? easyLevel : hardLevel;

		remaining = level.duration;
		duration = level.duration;
	}

	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (isPlaying) return;

			requestAnimationFrame(loop);

			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				// TODO Lost logic
				isPlaying = false;
			}
		}

		loop();
	}
</script>

<div class="game">
	<div class="info">
		<Countdown {remaining} {duration} />
	</div>

	<div class="grid-container">
		<Grid
			grid={level.thumbs}
			{found}
			{guessed}
			on:found={(e) => {
				const { match } = e.detail.thumb;

				audio_tada.play();

				setTimeout(() => {
					// This timeout for sync flip and correct guess timings
					guessed = match;
				}, 250);

				setTimeout(() => {
					guessed = '';
					found = [...found, match];
				}, 1000);
			}}
		/>
	</div>

	<div class="score">
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
		height: 5vmin;
		width: 60vmin;
		margin-bottom: 5vmin;
		display: flex;
	}

	.score {
		height: 10vmin;
		width: 60vmin;
	}

	@media screen and (min-width: 1024px) {
		.game {
			align-self: flex-start;
		}
	}
</style>
