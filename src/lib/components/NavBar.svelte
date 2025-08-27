<!-- NavBar.svelte -->
<script lang="ts">
  import { isDarkMode } from '$lib/stores/themeStore';
  
  /**
   * @typedef {Object} NavLink
   * @property {string} href - The URL the link points to
   * @property {string} text - The display text for the link
   */
 
  /** Array of navigation links */
  export let links: { href: string; text: string }[] = [];
  
  /** State for mobile menu visibility */
  let isMenuOpen = false;
  
  /**
   * Toggles between light and dark theme
   */
  function toggleTheme() {
    $isDarkMode = !$isDarkMode;
  }
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0 flex items-center space-x-2">
          <span class="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
            Stock<span class="text-gray-800 dark:text-white">Analyzer</span>
          </span>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden sm:flex sm:items-center sm:ml-6 space-x-8">
        {#each links as link}
          <a
            href={link.href}
            class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                   px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {link.text}
          </a>
        {/each}
        
        <button
          on:click={toggleTheme}
          class="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Toggle dark mode"
        >
          {#if $isDarkMode}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center sm:hidden">
        <button
          on:click={() => isMenuOpen = !isMenuOpen}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        {#each links as link}
          <a
            href={link.href}
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50
                   dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {link.text}
          </a>
        {/each}
        
        <button
          on:click={toggleTheme}
          class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50
                 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {$isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  {/if}
</nav>
