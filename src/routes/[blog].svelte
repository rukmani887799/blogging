<script>
	import Render from '$lib/render.svelte';
	import store from '$lib';
	export let content;
	// $: console.log('blog', { content, title });
</script>

<div class="w-full h-full flex flex-col">
	<Render {content} />
</div>
