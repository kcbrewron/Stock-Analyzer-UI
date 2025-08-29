<script>
    import { onDestroy } from "svelte";
    import Alert from "$lib/components/Alert.svelte";
    import { analysisStore } from "$lib/stores/analysisStore.js";

    let ticker;
    let error = null;

    // Subscribe to analysis store
    $: analysisState = $analysisStore;

    async function startAnalysis(ticker) {
        if (!ticker) {
            error = "Please enter a stock ticker symbol";
            return;
        }

        error = null;

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ticker }),
            });

            if (!response.ok) {
                console.error("Server error:", response.statusText);
                throw new Error(
                    `Oh no. We have an error. We're working through this problem. Please try again later.`,
                );
            }
            
            const resp = await response.json();
            
            console.log("Analysis response:", JSON.stringify(resp));

            const analysisId = resp?.data?.analysis_id || null;

            if (!analysisId) {
                throw new Error("No analysis ID returned from server");
            }

            // Start analysis in store and begin polling
            analysisStore.startAnalysis(analysisId);
            analysisStore.startPolling(analysisId);
        } catch (err) {
            console.error("Error during analysis:", err);
            error =
                err.message || "Failed to start analysis. Please try again.";
            analysisStore.setError(err);
        }
    }

    // Cleanup polling on component destroy
    onDestroy(() => {
        analysisStore.stopPolling();
    });
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

        <div
            class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
            <div class="p-8">
                <div class="max-w-md mx-auto">
                    <div class="mb-6">
                        <Alert
                            type="error"
                            message={error || analysisState.error?.message}
                        />
                        <label
                            for="ticker"
                            class="block text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Stock Ticker Symbol
                        </label>
                        <input
                            type="text"
                            id="ticker"
                            bind:value={ticker}
                            class="mt-1 h-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., AAPL"
                            disabled={analysisState.isAnalyzing}
                        />
                    </div>
                    <button
                        on:click={() => startAnalysis(ticker)}
                        disabled={!ticker || analysisState.isAnalyzing}
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {analysisState.isAnalyzing
                            ? "Analysis in Progress..."
                            : "Begin Analysis"}
                    </button>
                </div>

                {#if analysisState.isAnalyzing}
                    <div
                        class="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                        <h2
                            class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
                        >
                            Analysis Progress
                        </h2>
                        <div class="space-y-4">
                            {#if analysisState.analysisId}
                                <div class="flex justify-between">
                                    <span
                                        class="text-gray-600 dark:text-gray-300"
                                        >Analysis ID:</span
                                    >
                                    <span
                                        class="font-mono text-gray-900 dark:text-white"
                                        >{analysisState.analysisId}</span
                                    >
                                </div>
                            {/if}
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300"
                                    >Ticker:</span
                                >
                                <span
                                    class="font-mono text-gray-900 dark:text-white"
                                    >{ticker}</span
                                >
                            </div>

                            <!-- Progress Bar -->
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span
                                        class="text-gray-600 dark:text-gray-300"
                                        >Progress:</span
                                    >
                                    <span class="text-gray-900 dark:text-white"
                                        >{analysisState.progress}%</span
                                    >
                                </div>
                                <div
                                    class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600"
                                >
                                    <div
                                        class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                        style="width: {analysisState.progress}%"
                                    ></div>
                                </div>
                                {#if analysisState.currentStep}
                                    <p
                                        class="text-sm text-gray-600 dark:text-gray-300 mt-2"
                                    >
                                        {analysisState.currentStep}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}

                {#if analysisState.results && !analysisState.isAnalyzing}
                    <div
                        class="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                        <h2
                            class="text-lg font-semibold text-green-900 dark:text-green-100 mb-4"
                        >
                            Analysis Complete!
                        </h2>
                        <div class="text-green-800 dark:text-green-200">
                            <pre
                                class="whitespace-pre-wrap text-sm">{JSON.stringify(
                                    analysisState.results,
                                    null,
                                    2,
                                )}</pre>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
