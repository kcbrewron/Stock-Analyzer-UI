<!-- AnalysisLoader.svelte -->
<script>
    import { analysisStore } from '$lib/stores/analysisStore';
    import { derived } from 'svelte/store';

    // Derive steps and currentStep from the analysis store
    $: steps = $analysisStore.steps;
    $: currentStep = $analysisStore.currentStep;
</script>

<div class="w-full max-w-2xl mx-auto px-4 py-8">
  <div class="relative">
    <!-- Progress Bar -->
    <div
      class="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax={steps.length}
      aria-valuenow={currentStep + 1}
    >
      <div
        class="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
        style="width: {((currentStep + 1) / steps.length) * 100}%"
      />
    </div>

    <!-- Steps -->
    <div class="relative flex justify-between">
      {#each steps as step, index}
        <div class="flex flex-col items-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                   {step.status === 'completed' ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' :
                     step.status === 'active' ? 'bg-white border-blue-600 dark:bg-gray-800 dark:border-blue-500' :
                     step.status === 'error' ? 'bg-red-600 border-red-600 dark:bg-red-500 dark:border-red-500' :
                     'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'}"
            aria-current={step.status === 'active' ? 'step' : undefined}
          >
            {#if step.status === 'completed'}
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            {:else if step.status === 'error'}
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            {:else if step.status === 'active'}
              <div class="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
            {:else}
              <span class="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
            {/if}
          </div>
          <span
            class="mt-2 text-sm font-medium text-center
                   {step.status === 'completed' ? 'text-blue-600 dark:text-blue-500' :
                     step.status === 'active' ? 'text-gray-900 dark:text-white' :
                     step.status === 'error' ? 'text-red-600 dark:text-red-500' :
                     'text-gray-500 dark:text-gray-400'}"
          >
            {step.label}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>
