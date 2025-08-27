<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    import { isDarkMode } from '$lib/stores/themeStore';
    import { onMount } from 'svelte';

    // Initialize theme on mount
    onMount(() => {
        // The store will handle the initial theme and subsequent changes
        return () => {
            // Cleanup if needed
        };
    });
</script>

<!-- Apply dark mode class based on store value -->
<div class:dark={$isDarkMode}>
    <NavBar brand="Stock Analyzer" links={[
        { href: "/", text: "Home" },
        { href: "/analysis", text: "Analysis" },
        { href: "/about", text: "About" },
        { href: "/contact", text: "Contact" }
    ]}/>
    <slot />
    <Footer />
</div>