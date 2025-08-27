<!-- HorizontalLayout.svelte -->
<script lang="ts">
  export let gap: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let align: 'start' | 'center' | 'end' | 'stretch' = 'start';
  export let justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';
  export let wrap: boolean = true;

  const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const alignStyles = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifyStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  $: classes = [
    'flex',
    wrap ? 'flex-wrap' : 'flex-nowrap',
    gapStyles[gap],
    alignStyles[align],
    justifyStyles[justify]
  ].join(' ');
</script>

<div class={classes}>
  <slot />
</div>
