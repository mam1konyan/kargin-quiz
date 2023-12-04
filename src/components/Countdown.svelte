<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div
	class="countdown"
	style="
		--duration-color: {remaining >= duration * 0.5
		? '#2ecc71'
		: remaining >= duration * 0.2
		  ? '#fbc531'
		  : '#e84118'}
	"
>
	<div
		class="duration"
		style="--remaining-color: {remaining >= duration * 0.5
			? '#27ae60'
			: remaining >= duration * 0.2
			  ? '#e1b12c'
			  : '#c23616'}"
	>
		<span>{Math.round(remaining / 1000)}</span>
		<div class="remaining" style="--p: {remaining / duration}" />
	</div>
</div>

<style>
	.countdown {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}

	.duration {
		flex: 1;
		background: var(--duration-color);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
		font-size: 1rem;
		font-weight: 700;
		color: #eaecef;
		-webkit-text-stroke: 1px #0f0f0f;
		position: absolute;
		z-index: 1;
		cursor: default;
	}

	.remaining {
		position: absolute;
		left: 0;
		width: calc(100% * var(--p));
		height: 100%;
		background: var(--remaining-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (min-width: 1025px) {
		span {
			font-size: 2rem;
		}
	}
</style>
