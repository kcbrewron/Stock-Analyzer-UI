<!-- Input.svelte -->
<script lang="ts">
  export let type: 'text' | 'email' | 'password' | 'number' | 'search' = 'text';
  export let value: string = '';
  export let placeholder: string = '';
  export let label: string = '';
  export let error: string = '';
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let id: string = '';

  $: inputId = id || `input-${Math.random().toString(36).slice(2)}`;
</script>

<div class="w-full">
  {#if label}
    <label
      for={inputId}
      class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
    >
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    type={type}
    {id}
    {value}
    on:input={(e) => value = e.currentTarget.value}
    {placeholder}
    {disabled}
    {required}
    aria-invalid={!!error}
    aria-describedby={error ? `${inputId}-error` : undefined}
    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
           dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400
           disabled:opacity-50 disabled:cursor-not-allowed
           {error ? 'border-red-500 focus:ring-red-500' : ''}"
  />
  
  {#if error}
    <p
      id="{inputId}-error"
      class="mt-2 text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {error}
    </p>
  {/if}
</div>
