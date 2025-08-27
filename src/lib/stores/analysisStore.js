import { writable } from 'svelte/store';

/**
 * @typedef {Object} AnalysisState
 * @property {boolean} isAnalyzing - Whether analysis is currently running
 * @property {number} progress - Progress percentage (0-100)
 * @property {string} currentStep - Current step description
 * @property {Error|null} error - Error object if analysis failed
 * @property {string|null} results - Analysis results
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
        results: null
    });

    return {
        subscribe: store.subscribe,
        
        /**
         * Start the analysis process
         */
        startAnalysis: () => {
            store.update(state => ({
                ...state,
                isAnalyzing: true,
                progress: 0,
                currentStep: 'Starting analysis...',
                error: null,
                results: null
            }));
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
         * Reset the analysis store to initial state
         */
        reset: () => {
            store.set({
                isAnalyzing: false,
                progress: 0,
                currentStep: '',
                error: null,
                results: null
            });
        }
    };
}

export const analysisStore = createAnalysisStore();