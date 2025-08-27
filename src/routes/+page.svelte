<script>
    import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span class="block">Stock Analysis</span>
                <span class="block text-blue-600 dark:text-blue-500">Made Simple</span>
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Get comprehensive stock analysis powered by advanced algorithms and machine learning.
                Make informed investment decisions with our detailed reports and insights.
            </p>
            <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div class="rounded-md shadow">
                    <a href="/analysis"
                       class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Start Analysis
                    </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                    <a href="/about"
                       class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 md:py-4 md:text-lg md:px-10">
                        Learn More
                    </a>
                </div>
            </div>
        </div>

        <div class="mt-20">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div class="pt-6">
                    <div class="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                            <div class="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Technical Analysis</h3>
                            <p class="mt-5 text-base text-gray-500 dark:text-gray-300">
                                Advanced technical indicators and pattern recognition to help identify market trends and opportunities.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="pt-6">
                    <div class="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                            <div class="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">Fundamental Analysis</h3>
                            <p class="mt-5 text-base text-gray-500 dark:text-gray-300">
                                Comprehensive financial statements analysis and key performance indicators evaluation.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="pt-6">
                    <div class="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
                        <div class="-mt-6">
                            <div class="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </div>
                            <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">News & Sentiment</h3>
                            <p class="mt-5 text-base text-gray-500 dark:text-gray-300">
                                Real-time news analysis and social media sentiment tracking for market insights.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
