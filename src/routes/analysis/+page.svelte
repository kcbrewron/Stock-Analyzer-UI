<script>
    import { page } from "$app/stores";
    import Alert from "$lib/components/Alert.svelte";
    
    let ticker;
    let analysisId = null;
    let analysisStarted = false;
    let error = null;

    async function startAnalysis(ticker) {
        if (!ticker) {
            error = "Please enter a stock ticker symbol";
            return;
        }

        analysisStarted = true;
        error = null;
        
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ticker })
            });

            if (!response.ok) {
                throw new Error(`Oh no. We have an error. We're working through this problem. Please try again later.`);
            }

            const data = await response.json();
            console.log('Analysis response:', data);
            
            if (data.error) {
                throw new Error(data.error);
            }

            analysisId = data.analysisId;
        } catch (err) {
            console.error('Error during analysis:', err);
            error = err.message || 'Failed to start analysis. Please try again.';
            analysisStarted = false;
        }
    }
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Stock Analysis
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">
                Enter a stock ticker to begin analysis
            </p>
        </div>



        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div class="p-8">
                <div class="max-w-md mx-auto">
                    <div class="mb-6">
                        <Alert type="error" message={error} />
                        <label for="ticker" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Stock Ticker Symbol
                        </label>
                        <input
                            type="text"
                            id="ticker"
                            bind:value={ticker}
                            class="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., AAPL"
                        />
                    </div>
                    <button
                        on:click={() => startAnalysis(ticker)}
                        disabled={!ticker || analysisStarted}
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {analysisStarted ? 'Analysis in Progress...' : 'Begin Analysis'}
                    </button>
                </div>


                {#if analysisStarted && analysisId}
                    <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analysis Details</h2>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Analysis ID:</span>
                                <span class="font-mono text-gray-900 dark:text-white">{analysisId}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Ticker:</span>
                                <span class="font-mono text-gray-900 dark:text-white">{ticker}</span>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>