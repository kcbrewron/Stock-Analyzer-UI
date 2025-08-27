import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	alias: {
		$components: 'src/lib/components',
		$stores: 'src/lib/stores',
		$utils: 'src/lib/utils'
	},
	kit: {
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};

export default config;
