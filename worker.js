// Main worker entry point that exports both SvelteKit app and Durable Objects

// Export the Durable Object class
export { StockAnalysisDurableObject } from './src/lib/utils/StockAnalysisDurableObject.js';

// Import and re-export the built SvelteKit app
// The build/index.js contains the complete worker with all dependencies bundled
import { default as svelteKitWorker } from './build/index.js';

// Export the SvelteKit worker as default
export default svelteKitWorker;