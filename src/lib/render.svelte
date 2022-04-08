<script>
	import store from '$lib';
	import Markdown, { highlightCode, setHljs, getLang, setLang } from 'markdown-hljs';
	export let content = '';
	const _content = store.g('content');
	export let codeStyle = '/hljs/github-dark.css';
	let shadowroot;
	$: style = codeStyle
		? `<link rel="stylesheet" href=${codeStyle} />
		
		<style>
			*{
				user-select:text;
			}
			:root {
				--zeta-green: #31e5c1;
				--zeta-green-highlight: #34fed7;
				--zeta-green_check: rgb(55, 136, 124);
				--zeta-dark-green: #248576;
				--dmt-magenta: #2b294c;
				--dmt-dark-violet: #2e1740;
			}
			img {
				max-width: 100%;
				height: auto;
			}
			a {
				background-color: var(--zeta-green);
				color: green
				
			}
			p code {
				background-color: #0d1117;;
				color: #c9d1d9;
			}
			a p code,
			a code {
				background-color: var(--zeta-green-highlight);
				color: green
			}
			blockquote {
				border-left: 0.25rem solid #3eb0ef;;
				padding-left: 5px;
			}
			p{
				font-size: 1.2rem;
			}
		</style>
	`
		: '';

	const shadow = (node) => {
		shadowroot = node.attachShadow({ mode: 'open' });
	};

	$: if (shadowroot) {
		shadowroot.innerHTML = style + Markdown(content || $_content);
	}
</script>

<div class="h-full overflow-y-auto" use:shadow />
