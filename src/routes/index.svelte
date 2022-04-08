<script lang="ts">
	export let blogs: { title: string; pathname: string }[] = [];
	$: console.log('blogs', blogs);
</script>

<div class="w-full h-full flex flex-col gap-5">
	{#each blogs as { title, pathname }, idx}
		<div>
			<p class="text-2xl">
				{idx + 1}.
				<a href="/{pathname}" class=" underline">{title}</a>
			</p>
		</div>
	{/each}
</div>

<style>
	/* a {
		background-color: var(--zeta-green);
		color: green;
	} */
</style>
