<script>
	import { browser } from "$app/environment";
	import Toggle from "./Toggle.svelte";

	let isDarkMode =
		browser && localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : false;

	$: if (browser) {
		if (isDarkMode) {
			document.documentElement.setAttribute("data-theme", "dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "light");
			localStorage.setItem("theme", "light");
		}
	}
</script>

<div class="wrapper">
	<div class="label">ԿԱՐԳԻՆ ՔՈւԻԶ</div>
	<div class="toggle">
		<Toggle bind:checked={isDarkMode} />
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 0;
		flex-shrink: 1;
		height: 4rem;
		background: var(--secondary-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		color: var(--font-color);
	}
</style>
