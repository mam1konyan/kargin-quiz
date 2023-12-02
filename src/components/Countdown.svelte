<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown">
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
