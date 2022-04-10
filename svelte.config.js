import { resolve } from 'path';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter({
			pages: 'build/frontend',
			assets: 'build/frontend',
			fallback: null
		})
	},
	vite: {
		resolve: {
			alias: {
				$store: resolve('src/store')
			}
		}
	}
};

export default config;
