import { writable } from 'svelte/store';

/**
 * @typedef {Object} AnalysisState
 * @property {boolean} isAnalyzing - Whether analysis is currently running
 * @property {number} progress - Progress percentage (0-100)
 * @property {string} currentStep - Current step description
 * @property {Error|null} error - Error object if analysis failed
 * @property {string|null} results - Analysis results
 * @property {string|null} analysisId - ID of the current analysis
 * @property {number|null} pollingInterval - ID of the polling interval
 */

/**
 * Creates an analysis store with methods to update analysis state
 * @returns {Object} Store and helper methods
 */
function createAnalysisStore() {
    /** @type {import('svelte/store').Writable<AnalysisState>} */
    const store = writable({
        isAnalyzing: false,
        progress: 0,
        currentStep: '',
        error: null,
        results: null,
        analysisId: null,
        pollingInterval: null
    });

    return {
        subscribe: store.subscribe,
        
        /**
         * Start the analysis process with polling
         * @param {string} analysisId - ID of the analysis to track
         */
        startAnalysis: (analysisId) => {
            store.update(state => {
                // Clear any existing polling
                if (state.pollingInterval) {
                    clearInterval(state.pollingInterval);
                }
                
                return {
                    ...state,
                    isAnalyzing: true,
                    progress: 0,
                    currentStep: 'Starting analysis...',
                    error: null,
                    results: null,
                    analysisId,
                    pollingInterval: null
                };
            });
        },

        /**
         * Update the analysis progress
         * @param {number} progress - Progress percentage
         * @param {string} step - Current step description
         */
        updateProgress: (progress, step) => {
            store.update(state => ({
                ...state,
                progress,
                currentStep: step
            }));
        },

        /**
         * Complete the analysis with results
         * @param {string} results - Analysis results
         */
        completeAnalysis: (results) => {
            store.update(state => ({
                ...state,
                isAnalyzing: false,
                progress: 100,
                currentStep: 'Analysis complete',
                results
            }));
        },

        /**
         * Set error state for failed analysis
         * @param {Error} error - Error object
         */
        setError: (error) => {
            store.update(state => ({
                ...state,
                isAnalyzing: false,
                error,
                currentStep: 'Analysis failed'
            }));
        },

        /**
         * Start smart polling for analysis status updates with exponential backoff
         * @param {string} analysisId - ID of the analysis to poll
         * @param {number} initialInterval - Initial polling interval in milliseconds (default: 1000)
         * @param {number} maxInterval - Maximum polling interval in milliseconds (default: 10000)
         */
        startPolling: (analysisId, initialInterval = 1000, maxInterval = 10000) => {
            store.update(state => {
                // Clear existing polling
                if (state.pollingInterval) {
                    clearTimeout(state.pollingInterval);
                }
                
                let currentInterval = initialInterval;
                let consecutiveErrors = 0;
                
                const scheduleNext = () => {
                    const pollingInterval = setTimeout(async () => {
                        try {
                            const response = await fetch(`/api/analysis/${analysisId}`);
                            if (!response.ok) {
                                throw new Error('Failed to fetch analysis');
                            }
                            
                            const statusData = await response.json();
                            
                            // Reset error count on successful response
                            consecutiveErrors = 0;
                            
                            if (statusData.error) {
                                analysisStore.setError(new Error(statusData.error));
                                return;
                            }
                            
                            // Update progress based on status
                            if (statusData.status === 'completed') {
                                analysisStore.completeAnalysis(statusData.results);
                                analysisStore.stopPolling();
                                return;
                            } else if (statusData.status === 'failed') {
                                analysisStore.setError(new Error(statusData.error || 'Analysis failed'));
                                analysisStore.stopPolling();
                                return;
                            } else if (statusData.status === 'running') {
                                analysisStore.updateProgress(
                                    statusData.progress || 0,
                                    statusData.currentStep || 'Processing...'
                                );
                                
                                // Smart interval adjustment based on progress
                                if (statusData.progress > 0) {
                                    // Fast polling when progress is being made
                                    currentInterval = Math.max(initialInterval, currentInterval * 0.9);
                                } else {
                                    // Slower polling when no progress
                                    currentInterval = Math.min(maxInterval, currentInterval * 1.2);
                                }
                            }
                            
                            // Schedule next poll
                            scheduleNext();
                            
                        } catch (error) {
                            console.error('Polling error:', error);
                            consecutiveErrors++;
                            
                            // Exponential backoff on errors
                            if (consecutiveErrors < 5) {
                                currentInterval = Math.min(maxInterval, currentInterval * 2);
                                scheduleNext();
                            } else {
                                analysisStore.setError(error);
                                analysisStore.stopPolling();
                            }
                        }
                    }, currentInterval);
                    
                    // Update store with current polling timeout ID
                    store.update(state => ({
                        ...state,
                        pollingInterval
                    }));
                };
                
                // Start the first poll
                scheduleNext();
                
                return state;
            });
        },

        /**
         * Stop polling for status updates
         */
        stopPolling: () => {
            store.update(state => {
                if (state.pollingInterval) {
                    clearTimeout(state.pollingInterval);
                }
                return {
                    ...state,
                    pollingInterval: null
                };
            });
        },

        /**
         * Reset the analysis store to initial state
         */
        reset: () => {
            store.update(state => {
                if (state.pollingInterval) {
                    clearTimeout(state.pollingInterval);
                }
                return {
                    isAnalyzing: false,
                    progress: 0,
                    currentStep: '',
                    error: null,
                    results: null,
                    analysisId: null,
                    pollingInterval: null
                };
            });
        }
    };
}

export const analysisStore = createAnalysisStore();