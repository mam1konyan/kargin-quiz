<script>
	import '$lib';
	import '../styles.css';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Content from '../components/Content.svelte';
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
	}
</style>
