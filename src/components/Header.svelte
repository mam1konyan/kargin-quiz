<script>
	import { browser } from '$app/environment';
	import Toggle from './Toggle.svelte';

	let isDarkMode = browser ? document.documentElement.getAttribute('data-theme') === 'dark' : null;

	$: if (browser) {
		if (isDarkMode) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<div class="wrapper">
	<div class="label">ԿԱՐԳԻՆՔՈւԻԶ</div>
	<div class="toggle">
		<Toggle bind:checked={isDarkMode} />
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 0;
		flex-shrink: 1;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		color: var(--primary-color);
		font-size: 1rem;
		position: sticky;
		top: 0;
		background-color: var(--bg-color);
		z-index: 99;
	}

	.label {
		cursor: default;
		letter-spacing: 12px;
		font-style: italic;
		font-weight: 700;
		font-family: Bokonique, serif;
	}

	@media only screen and (min-width: 768px) {
		.wrapper {
			font-size: 2rem;
		}
	}
</style>
