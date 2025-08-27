import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	alias: {
		$components: 'src/lib/components',
		$stores: 'src/lib/stores',
		$utils: 'src/lib/utils'
	},
	kit: {
		// Use Cloudflare adapter
		adapter: cloudflareAdapter({
			// Configure the adapter for Cloudflare Pages
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		// Enable environment variables from Cloudflare
		env: {
			dir: './environments'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
