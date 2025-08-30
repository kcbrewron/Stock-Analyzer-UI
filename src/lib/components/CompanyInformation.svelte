<!-- CompanyInformation.svelte -->
<script>
    export let companyData = null;

    $: hasData = companyData && (
        companyData.ticker || 
        companyData.company_name || 
        companyData.sic_code || 
        companyData.sic_description || 
        companyData.company_description
    );
</script>

{#if hasData}
    <div class="my-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div class="flex items-center mb-4">
            <svg class="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h3>
        </div>

        <div class="grid gap-4">
            {#if companyData.ticker}
                <div class="flex flex-col sm:flex-row sm:items-center">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-32">Ticker:</dt>
                    <dd class="mt-1 text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded sm:mt-0">
                        {companyData.ticker}
                    </dd>
                </div>
            {/if}

            {#if companyData.company_name}
                <div class="flex flex-col sm:flex-row sm:items-center">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-32">Company Name:</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0">
                        {companyData.company_name}
                    </dd>
                </div>
            {/if}

            {#if companyData.sic_code}
                <div class="flex flex-col sm:flex-row sm:items-center">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-32">SIC Code:</dt>
                    <dd class="mt-1 text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded sm:mt-0">
                        {companyData.sic_code}
                    </dd>
                </div>
            {/if}

            {#if companyData.sic_description}
                <div class="flex flex-col sm:flex-row">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-32">Industry:</dt>
                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0">
                        {companyData.sic_description}
                    </dd>
                </div>
            {/if}

            {#if companyData.company_description}
                <div class="flex flex-col">
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description:</dt>
                    <dd class="text-sm text-gray-900 dark:text-white leading-relaxed">
                        {companyData.company_description}
                    </dd>
                </div>
            {/if}
        </div>
    </div>
{/if}