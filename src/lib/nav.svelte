<script>
	import { page } from '$app/stores';
</script>

<div class="p-1 sticky top-0 z-50 bg-[129, 219, 249] text-black-500 border-b-2 border-cyan-900">
	<a
		href="/"
		class:active={$page.url.pathname == '/'}
		class="btn text-xl w-[min-content!important] border-2 p-[0.25rem!important] border-transparent uppercase text-center "
		>my blogs</a
	>
	<a
		href="/write"
		class:active={$page.url.pathname == '/write'}
		class="btn text-xl w-[min-content!important]  border-2  p-[0.25rem!important] border-transparent uppercase text-center "
		>Text editor</a
	>
</div>

<style>
	.active {
		@apply border-slate-500;
	}
</style>
