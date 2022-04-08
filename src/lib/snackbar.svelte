<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import store from '$lib';
	import { browser } from '$app/env';
	const snackbar = store.g('snack');
	$: console.log('snackbar', $snackbar);
	$: sm = browser ? innerWidth <= 768 : false;
</script>

{#key $snackbar}
	<div
		in:fly={{ delay: 10, y: sm ? -48 : 48, duration: 500 }}
		out:fly={{ delay: 10, y: sm ? -48 : 48, duration: 500 }}
		id="snackbar"
		class:show={$snackbar}
		class="snackbar"
	>
		<span class="message">{$snackbar}</span>
	</div>
{/key}

<style>
	.snackbar {
		@apply hidden bg-transparent text-transparent text-center fixed z-[9999] min-w-full text-sm p-2 md:text-lg pr-4 md:pr-[unset] md:pl-8 top-8 md:top-[unset] md:bottom-8;
		-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
		animation: fadein 0.5s, fadeout 0.5s 2.5s;
	}
	.message {
		@apply bg-slate-800 rounded-sm p-4;
		color: #fff;
	}

	.show {
		display: flex !important;
	}
</style>
