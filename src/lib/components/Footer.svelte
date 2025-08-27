<!-- Footer.svelte -->
<script lang="ts">
  export let copyrightText: string = '© ' + new Date().getFullYear() + ' Stock Analyzer. All rights reserved.';
  export let links: { href: string; text: string }[] = [];
</script>

<footer class="bg-white dark:bg-gray-800">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <nav class="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
      {#each links as link}
        <div class="px-5 py-2">
          <a
            href={link.href}
            class="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            {link.text}
          </a>
        </div>
      {/each}
    </nav>
    <p class="mt-8 text-center text-base text-gray-500 dark:text-gray-400">
      {copyrightText}
    </p>
  </div>
</footer>
