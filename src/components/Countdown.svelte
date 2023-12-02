<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown">
	<button>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path
				d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2M18 11H13L14.81 9.19A3.94 3.94 0 0 0 12 8A4 4 0 1 0 15.86 13H17.91A6 6 0 1 1 12 6A5.91 5.91 0 0 1 16.22 7.78L18 6Z"
				fill="#c0392b"
			/>
		</svg>
	</button>
	<div class="duration">
		<div class="remaining" />
	</div>
</div>

<style>
	.countdown {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button {
		font-size: 6rem;
		width: 5rem;
		height: 5rem;
		border: none;
		background: none;
	}

	svg {
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
		cursor: pointer;
	}

	.duration {
		flex: 1;
		height: 1rem;
		background: yellow;
	}

	.remaining {
		position: absolute;
	}
</style>
