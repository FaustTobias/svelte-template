<script lang="ts">
	import Tailwind from "../Tailwind.svelte";

    import Nav from "../components/Nav.svelte";

    export let segment: string;
</script>

<Nav {segment} />

<!-- Embed the tailwind stylesheets -->
<Tailwind />

<main>
    <slot />
</main>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
