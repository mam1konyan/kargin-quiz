<script>
	import { fade } from 'svelte/transition';
	export let checked;
</script>

<label class="switch">
	<input id="theme-mode" type="checkbox" bind:checked />

	<span class="slider">
		<svg class="bn-svg switch-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			{#if checked === null}
				{null}
			{:else if checked}
				<path
					in:fade={{ duration: 0.5 }}
					d="M20.968 12.768a7 7 0 01-9.735-9.735 9 9 0 109.735 9.735z"
					fill="currentColor"
				/>
			{:else}
				<path
					in:fade={{ duration: 0.5 }}
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10.5 2h3v3h-3V2zM16 12a4 4 0 11-8 0 4 4 0 018 0zM5.99 3.869L3.867 5.99 5.99 8.112 8.111 5.99 5.989 3.87zM2 13.5v-3h3v3H2zm1.868 4.51l2.121 2.12 2.122-2.12-2.122-2.122-2.121 2.121zM13.5 19v3h-3v-3h3zm4.51-3.112l-2.121 2.122 2.121 2.121 2.121-2.121-2.121-2.122zM19 10.5h3v3h-3v-3zm-3.11-4.51l2.12 2.121 2.122-2.121-2.121-2.121-2.122 2.121z"
					fill="currentColor"
				/>
			{/if}
		</svg>
	</span>
</label>

<style>
	.switch {
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--toggle-bg);
		border-radius: 34px;
		color: var(--togle-icon-color);
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: var(--toggle-dot);
		border-radius: 50%;
		transform: var(--toggle-transform);
		transition: var(--transition-time);
	}

	svg {
		width: 22px;
		height: 22px;
		position: absolute;
		left: 6px;
		bottom: 6px;
		transform: var(--toggle-transform);
	}
</style>
