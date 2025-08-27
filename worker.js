// Main worker entry point that exports both SvelteKit app and Durable Objects
import svelteKitApp from './build/index.js';

// Export the Durable Object class
export { StockAnalysisDurableObject } from './src/lib/utils/StockAnalysisDurableObject.js';

// Export SvelteKit app as default
export default svelteKitApp;