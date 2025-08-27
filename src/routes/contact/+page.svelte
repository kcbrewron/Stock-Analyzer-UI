<script>
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Me</h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">Let's connect and discuss technology!</p>
        </div>

        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Connect With Me</h2>
                        <div class="space-y-4">
                            <div>
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Social Media</h3>
                                <div class="mt-2 space-y-2">
                                    <a href="https://twitter.com/kcbrewron" 
                                       class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                        <span class="mr-2">Twitter</span>
                                        <span>@kcbrewron</span>
                                    </a>
                                    <a href="https://github.com/kcbrewron" 
                                       class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                        <span class="mr-2">GitHub</span>
                                        <span>@kcbrewron</span>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Blog</h3>
                                <div class="mt-2">
                                    <a href="https://ronnelson.dev" 
                                       class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                        ronnelson.dev
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                                <p class="mt-2 text-gray-700 dark:text-gray-300">
                                    Lone Jack, MO
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Send a Message</h2>
                        <form class="space-y-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Name
                                </label>
                                <input type="text" id="name" name="name" 
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Email
                                </label>
                                <input type="email" id="email" name="email" 
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label for="message" class="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea id="message" name="message" rows="4" 
                                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                            </div>
                            <div>
                                <button type="submit" 
                                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
