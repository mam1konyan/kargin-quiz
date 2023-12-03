import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

const [send, receive] = crossfade({
	duration: 600,
	easing: cubicOut
});

export { send, receive };
