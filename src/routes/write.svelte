<script lang="ts">
	import Render from '$lib/render.svelte';
	import Writer from '$lib/writer.svelte';
	import store from '$lib';
	import { enhance } from '$lib/form';
	import { goto } from '$app/navigation';
	let render = false;
	const { title, content, snack } = store.state;
	const result = (data) => {
		snack.show('Your blog is live now 🥳🥳)');
		console.log(data);
		$content = '';
		$title = '';
		goto('/' + data.pathname);
	};
	const error = (data) => {
		snack.show('We got an error!');
		console.error(data);
	};
	const publish = async () => {
		if (!$title || !$content) {
			snack.show('Thank you using me');
			return;
		}
		try {
			const res = await fetch('/write', {
				method: 'post',
				headers: {
					accept: 'application/json'
				},
				body: JSON.stringify({ title: $title, content: $content })
			});
			console.log('res', res);

			const data = await res.json();
			if (res.ok) {
				result(data);
			} else {
				error(data);
			}
		} catch (e) {
			if (error) {
				error(null);
			} else {
				throw e;
			}
		}
	};
</script>

<div class="w-full h-full flex flex-col">
	<div class="sticky top-0 flex justify-between gap-5">
		<button
			on:click={() => (render = !render)}
			class="btn p-[0.25rem!important] bg-blue-400 text-xl w-[min-content!important]  uppercase text-center "
			>{render ? 'markdown' : 'preview'}</button
		>
		<div class="flex gap-2">
			<input
				bind:value={$title}
				placeholder="Heading"
				class="focus:outline-none max-w-full w-[23rem] p-[0.23rem!important] flex-grow placeholder:text-black-700 bg-blue-200 rounded text-center"
				type="text"
			/>
			<button
				on:click={publish}
				class="btn p-[0.25rem!important] bg-blue-400 text-xl w-[min-content!important]  uppercase text-center "
				>publish</button
			>
		</div>
	</div>
	{#if render}
		<Render />
	{:else}
		<Writer />
	{/if}
</div>
