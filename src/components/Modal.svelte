<div class="modal">
	<slot />
</div>

<style>
	.modal {
		z-index: 999;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(10px);
		position: absolute;
		left: 0;
		top: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
