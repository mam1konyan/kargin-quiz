<script>
	import Grid from './Grid.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { getLevels } from './levels.ts';

	let data = writable([]);
	let easyLevel = {};
	let hardLevel = {};
	let found = [];

	onMount(async () => {
		const response = await fetch('https://api.mamikonyan.io/kargin/data.json');
		$data = await response.json();
	});

	$: {
		[easyLevel, hardLevel] = getLevels($data);
		console.log('easyLevel =>', easyLevel);
		console.log('hardLevel =>', hardLevel);
		console.log('======================================');
	}
</script>

<div class="game">
	<div class="info"></div>

	<div class="grid-container">
		<Grid />
	</div>

	<div class="info"></div>
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
