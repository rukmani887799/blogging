<script>
	import Snackbar from '$lib/snackbar.svelte';
    import '../app.css';
	import store from '$lib';
	import { browser } from '$app/env';
	import Nav from '$lib/nav.svelte';
	// if (browser) store.dispatch('startConnectome');
</script>

<main class="min-h-screen flex justify-center">
	<div class="w-[min(55rem,100%)] p-3">
		<Nav />
		<slot />
	</div>
</main>
<Snackbar />
