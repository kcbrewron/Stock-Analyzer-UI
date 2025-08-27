import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	alias: {
		$components: 'src/lib/components',
		$stores: 'src/lib/stores',
		$utils: 'src/lib/utils'
	},
	kit: { adapter: adapter() },
};

export default config;
