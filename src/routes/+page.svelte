<script lang="ts">
	import '$lib';
	import '../styles.css';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Content from '../components/Content.svelte';
	import type { GameState } from '$lib/types';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	let gameState: Writable<GameState> = writable('waiting');

	setContext('gameState', gameState);
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
