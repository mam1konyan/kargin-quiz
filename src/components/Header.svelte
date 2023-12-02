<script>
	import { browser } from '$app/environment';

	let muted = browser ? localStorage.getItem('audioMuted') : null;
	let theme = browser ? document.documentElement.getAttribute('data-theme') : null;

	$: if (browser) {
		if (theme === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}

		if (muted === 'muted') {
			document.querySelectorAll('audio').forEach((elem) => (elem.muted = true));
			localStorage.setItem('audioMuted', 'muted');
		} else {
			document.querySelectorAll('audio').forEach((elem) => (elem.muted = false));
			localStorage.setItem('audioMuted', 'notMuted');
		}
	}
</script>

<div class="wrapper">
	<div class="label">ԿԱՐԳԻՆՔՈւԻԶ</div>
	<div class="toggle">
		{#if theme}
			<button
				on:click={() => {
					theme = theme === 'dark' ? 'light' : 'dark';
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					{#if theme === 'dark'}
						<path
							d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
							fill="#3498db"
						/>
					{:else}
						<path
							d="M1 11H4V13H1V11M19.1 3.5L17 5.6L18.4 7L20.5 4.9L19.1 3.5M11 1H13V4H11V1M4.9 3.5L3.5 4.9L5.6 7L7 5.6L4.9 3.5M10 22C10 22.6 10.4 23 11 23H13C13.6 23 14 22.6 14 22V21H10V22M12 6C8.7 6 6 8.7 6 12C6 14.2 7.2 16.2 9 17.2V19C9 19.6 9.4 20 10 20H14C14.6 20 15 19.6 15 19V17.2C16.8 16.2 18 14.2 18 12C18 8.7 15.3 6 12 6M13 15.9V17H11V15.9C9.3 15.5 8 13.9 8 12C8 9.8 9.8 8 12 8S16 9.8 16 12C16 13.9 14.7 15.4 13 15.9M20 11H23V13H20V11Z"
							fill="#f1c40f"
						/>
					{/if}
				</svg>
			</button>
		{/if}
		{#if muted}
			<button
				on:click={() => {
					muted = muted === 'muted' ? 'notMuted' : 'muted';
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					{#if muted === 'muted'}
						<path
							d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z"
							fill="#c0392b"
						/>
					{:else}
						<path
							d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
							fill="#27ae60"
						/>
					{/if}
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		flex-grow: 0;
		flex-shrink: 1;
		height: 5rem;
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

	svg {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		cursor: pointer;
	}

	.label {
		cursor: default;
		letter-spacing: 12px;
		font-style: italic;
		font-weight: 700;
		font-family: Bokonique, serif;
		-webkit-text-stroke: var(--logo-stroke);
	}

	.toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	button {
		width: 1.5rem;
		height: 1.5rem;
		border: none;
		background: none;
	}

	@media only screen and (min-width: 768px) {
		.wrapper {
			font-size: 2rem;
		}
	}
</style>
