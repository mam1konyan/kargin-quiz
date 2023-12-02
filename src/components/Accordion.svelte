<script>
	export let open = false;
	import { slide } from 'svelte/transition';
	const handleClick = () => (open = !open);
</script>

<div class="accordion">
	<div class="header" on:click={handleClick} role="button">
		<div class="text">
			<span class="icon">{open ? '-' : '+'}</span>
			<slot name="head" />
		</div>
	</div>

	{#if open}
		<div class="details" transition:slide>
			<slot name="details" />
		</div>
	{/if}
</div>

<style>
	div.accordion {
		margin: 1rem 0;
	}

	div.header {
		display: flex;
		width: 100%;
		cursor: pointer;
	}

	div.header .text {
		display: flex;
		flex: 1;
		color: var(--primary-color);
	}

	div.details {
		padding: 1rem;
	}

	.icon {
		font-weight: 700;
		margin-inline-end: 0.5rem;
		font-size: 1.5rem;
	}
</style>
