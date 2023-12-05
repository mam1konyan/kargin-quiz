<script lang="ts">
	import Grid from './Grid.svelte';
	import { getContext, onMount } from 'svelte';
	import { getLevels } from './levels.ts';
	import type { GameState, Level, Pairs, Points, Thumb } from '$lib/types';
	import Found from './Found.svelte';
	import Countdown from './Countdown.svelte';
	import Modal from './Modal.svelte';

	let audioTada: HTMLAudioElement;
	let wonAudio: HTMLAudioElement;
	let lostAudio: HTMLAudioElement;

	let gameState: GameState = getContext('gameState');
	let data: Pairs[] = getContext('data');

	let found: string[] = [];
	let guessed: string = '';
	let remaining: number = 0;
	let duration: number = 0;
	let grid: Thumb[] = Array(16);
	let points: Points = {
		correct: 0,
		left: 0,
		second: 0
	};
	let isPlaying: boolean = false;
	let flippedButton: number = -1;

	function start() {
		isPlaying = true;
		countdown();
	}

	function createNewGrid(difficulty: 'easy' | 'hard') {
		found = [];
		guessed = '';

		const [easyLevel, hardLevel] = getLevels($data);
		const level = difficulty === 'easy' ? easyLevel : hardLevel;

		remaining = duration = level.duration;
		grid = level.thumbs;
		points = level.points;
	}

	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (!isPlaying) return;

			requestAnimationFrame(loop);

			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				isPlaying = false;
				lostAudio.play();
				$gameState = 'lost';
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
					<div class="choose-desc">
						<span>Շրջի՛ր էն 2 կերպարներին որոնք նույն սկետչից են 👀</span>
					</div>
					<div class="choose-header">
						<span>Ընտրե՛ք բարդությունը</span>
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

								createNewGrid('easy');
							}}
						>
							ՀԵՇՏ
							<span
								class="thumbnail"
								class:flipped-thumb={flippedButton === 0}
								style="background-image: url('https://api.mamikonyan.io/kargin/easy.png');"
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

								createNewGrid('hard');
							}}
						>
							ԲԱՐԴ
							<span
								class="thumbnail"
								class:flipped-thumb={flippedButton === 1}
								style="
									background-image: url('https://api.mamikonyan.io/kargin/hard.png');
									background-position-x: 19px
								"
							/>
						</button>
					</div>
					<button
						class="main-button"
						disabled={flippedButton === -1 || !$data.length}
						on:click={() => {
							$gameState = 'playing';
							start();
						}}
						title={flippedButton === -1 ? '	Սկսելու համար ընտրեք բարդությունը ☝🏻' : 'Սկսել խաղը 🎲'}
					>
						ՍԿՍԵԼ
					</button>
				</div>
			{:else if $gameState === 'won'}
				<div class="end">
					<div class="celebrate end-thumb" />

					<span class="end-text">
						<h1>ՀԱՂԹԱՆԱ՜Կ 🥳</h1>
						Դու հավաքեցիր ընդհանուր{' '}
						<strong style="color: #27ae60">
							{Math.round(8 * points.correct + (remaining / 1000) * points.second)}
						</strong>
						միավոր 🏆
					</span>

					<button
						class="main-button"
						on:click={() => {
							$gameState = 'waiting';
							flippedButton = -1;
						}}
					>
						ՆՈՐԻՑ
					</button>
				</div>
			{:else if $gameState === 'lost'}
				<div class="end">
					<div class="lost end-thumb" />

					<span class="end-text">
						<h1>ՎԵՐՋ 😞</h1>
						Դու հավաքեցիր ընդամենը{' '}
						<strong style="color: #c23616">
							{Math.round(found.length * points.correct + (8 - found.length) * points.left)}
						</strong>
						միավոր 🤕 «Կարգինները» վերանայելու ժամանակն ա 🫣
					</span>

					<button
						class="main-button"
						on:click={() => {
							$gameState = 'waiting';
							flippedButton = -1;
						}}
					>
						ՆՈՐԻՑ
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
			{grid}
			{found}
			{guessed}
			on:found={(e) => {
				const { match } = e.detail.thumb;
				const isLastFound = found.length === 4 ** 2 / 2 - 1;

				setTimeout(() => {
					// This timeout for sync flip and correct guess timings

					guessed = match;

					if (isLastFound) {
						$gameState = 'won';
						isPlaying = false;
						wonAudio.play();
					}
				}, 250);

				if (!isLastFound) {
					audioTada.play();
					setTimeout(() => {
						guessed = '';
						found = [...found, match];
					}, 1000);
				}
			}}
		/>
	</div>

	<div class="score">
		<Found {found} {points} />
	</div>
	<audio src="https://api.mamikonyan.io/kargin/tada.mp3" bind:this={audioTada} />
	<audio src="https://api.mamikonyan.io/kargin/lost.mp3" bind:this={lostAudio} />
	<audio src="https://api.mamikonyan.io/kargin/won.mp3" bind:this={wonAudio} />
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

	.choose-desc {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
		width: 90%;
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
		border-radius: 50%;
		background: linear-gradient(to right, #544a7d, #ffd452);
		color: #fff;
		font-size: 1rem;
		letter-spacing: 3px;
		transition: transform 0.4s;
		font-weight: 700;
		margin-right: -3px;

		border: 2px solid #181a20;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.main-button {
		margin: 2rem auto 0;
		padding: 1rem 3rem;
		font-size: 1rem;
		letter-spacing: 3px;
		color: rgba(255, 255, 255, 0.3);
		font-weight: 700;
		border-radius: 2rem;
		border: none;
		cursor: not-allowed;
	}

	.main-button:not([disabled]) {
		background: linear-gradient(to right, #fc4a1a, #f7b733);
		color: rgba(255, 255, 255, 1);
		cursor: pointer;
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
		cursor: pointer;
	}

	.flipped-thumb {
		transform: rotateY(0deg);
	}

	.end {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.end-thumb {
		background-size: cover;
		border-radius: 50%;
		width: 7rem;
		height: 7rem;
	}

	.celebrate {
		background-image: url('https://api.mamikonyan.io/kargin/win.png');
	}

	.lost {
		background-image: url('https://api.mamikonyan.io/kargin/lost.png');
	}

	.end-text {
		font-size: 0.8rem;
		text-align: center;
		line-height: 2em;
		letter-spacing: 3px;
	}

	@media screen and (min-width: 1025px) {
		.game {
			align-self: flex-start;
			padding: 1rem;
		}

		.choose-desc {
			margin-bottom: 3rem;
			font-size: 2rem;
		}

		.choose-header {
			margin-bottom: 3rem;
			font-size: 2rem;
		}

		.option {
			width: 13rem;
			height: 13rem;
			font-size: 3rem;
			cursor: pointer;
			letter-spacing: 8px;
			border-width: 4px;
			-webkit-text-stroke: 1px #181a20;
		}

		.main-button {
			padding: 1rem 5rem;
			letter-spacing: 8px;
			font-size: 2rem;
			margin-top: 4rem;
		}

		.end-thumb {
			width: 17rem;
			height: 17rem;
		}

		.end-text {
			font-size: 2rem;
		}
	}
</style>
