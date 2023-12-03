<script lang="ts">
	import Grid from './Grid.svelte';
	import { getContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { getLevels } from './levels.ts';
	import type { GameState, Level, Points, Thumb } from '$lib/types';
	import Found from './Found.svelte';
	import Countdown from './Countdown.svelte';
	import Modal from './Modal.svelte';

	let audio_tada: HTMLAudioElement;

	let data = writable([]);

	let difficulty: 'easy' | 'hard' = 'easy';
	let level: Level;
	let found: string[] = [];
	let guessed: string = '';

	let remaining: number;
	let duration: number;

	let isPlaying: boolean = false;
	let flippedButton: number = -1;

	let gameState: GameState = getContext('gameState');

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
	{#if $gameState !== 'playing'}
		<Modal>
			{#if $gameState === 'waiting'}
				<div style="text-align: center">
					<div class="choose-header">
						<span>Ընտրեք բարդթությունը</span>
					</div>
					<div class="options">
						<button
							class="option"
							style={flippedButton === 1 ? 'transform: scale(0.7)' : ''}
							class:flipped={flippedButton === 0}
							on:click={() => {
								if (flippedButton === 0) {
									flippedButton = -1;
								} else {
									flippedButton = 0;
								}
							}}
						>
							ՀԵՇՏ
							<span
								class="thumbnail"
								class:flipped-thumb={flippedButton === 0}
								style="background-image: url('https://api.mamikonyan.io/assets/easy.png');"
							/>
						</button>
						<button
							class="option"
							style={flippedButton === 0 ? 'transform: scale(0.7)' : ''}
							class:flipped={flippedButton === 1}
							on:click={() => {
								if (flippedButton === 1) {
									flippedButton = -1;
								} else {
									flippedButton = 1;
								}
							}}
						>
							ԲԱՐԴ
							<span
								class="thumbnail"
								class:flipped-thumb={flippedButton === 1}
								style="
									background-image: url('https://api.mamikonyan.io/assets/hard.png');
									background-position-x: 19px
								"
							/>
						</button>
					</div>
					<button
						class="start"
						disabled={flippedButton === -1}
						on:click={() => {
							alert('aa');
						}}
					>
						ՍԿՍԵԼ
					</button>
				</div>
			{/if}
		</Modal>
	{/if}
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
				const isLastFound = found.length === 4 ** 2 / 2 - 1;

				audio_tada.play();

				setTimeout(() => {
					// This timeout for sync flip and correct guess timings

					guessed = match;

					if (isLastFound) {
						alert('Won');
					}
				}, 250);

				if (!isLastFound) {
					setTimeout(() => {
						guessed = '';
						found = [...found, match];
					}, 1000);
				}
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
		top: 6rem;

		padding: 1rem;
		box-sizing: content-box;
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
		margin-top: 2vmin;
	}

	.choose-header {
		width: 100%;
		text-align: center;
		margin-bottom: 2rem;
		font-size: 1.5rem;
	}

	.options {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.option {
		width: 6rem;
		height: 6rem;
		border: 0;
		border-radius: 50%;
		background: linear-gradient(to right, #544a7d, #ffd452);
		color: #fff;
		font-size: 1rem;
		letter-spacing: 3px;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.start {
		margin: 2rem auto 0;
		padding: 1rem 3rem;
		font-size: 1rem;
		letter-spacing: 3px;
		color: #fff;
		font-weight: 700;
		border-radius: 2rem;
		border: none;
	}

	.start:not([disabled]) {
		background: linear-gradient(to right, #fc4a1a, #f7b733);
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: none;
		background-size: cover;
		background-color: var(--bg-color);
	}

	.flipped-thumb {
		transform: rotateY(0deg);
	}

	@media screen and (min-width: 1024px) {
		.game {
			align-self: flex-start;
			padding: 0.5rem;
		}

		.choose-header {
			margin-bottom: 3rem;
			font-size: 3rem;
		}

		.option {
			width: 15rem;
			height: 15rem;
			font-size: 3rem;
			letter-spacing: 8px;
		}

		.start {
			padding: 1rem 5rem;
			letter-spacing: 8px;
			font-size: 2rem;
			margin-top: 4rem;
		}
	}
</style>
