<script lang="ts">
	import '$lib';
	import '../styles.css';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Content from '../components/Content.svelte';
	import type { GameState } from '$lib/types';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';
	import type { Pairs } from '$lib/types';

	let gameState: Writable<GameState> = writable('waiting');
	let data: Writable<Pairs[]> = writable([]);

	setContext('gameState', gameState);
	setContext('data', data);

	onMount(async () => {
		const response = await fetch('https://api.mamikonyan.io/kargin/data.json');
		$data = await response.json();

		console.log('Hey fellow coder 👋🏻. ');
		console.log(
			"If you here to get some chunk of code just go and check project's source code on Github 👇🏻"
		);
		console.log('https://github.com/mam1konyan/kargin-quiz');
	});
</script>

<div>
	<Header />
	<Content />
	<Footer />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		min-width: 100vw;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		background: var(--bg-color);
		transition: var(--transition-time);
		color: var(--secondary-color);
	}
</style>
