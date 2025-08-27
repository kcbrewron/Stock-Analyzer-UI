<!-- Button.svelte -->
<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
  export let disabled = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let fullWidth = false;

  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  $: classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : ''
  ].join(' ');
</script>

<button
  {type}
  class={classes}
  {disabled}
  on:click
  aria-disabled={disabled}
>
  <slot />
</button>
