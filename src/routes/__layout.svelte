<script context="module">
    export async function load({ url, params }) {
        const res = await fetch(`${url.origin}/api/booking-setup`);
        const data = await res.json();
        return {props: {booking_setup: data}}
    }
</script>

<script>
    import {webVitals} from '$lib/vitals';
    import {page} from '$app/stores';
    import '../app.css';
    import {browser} from "$app/env";
    // have to import FirebaseClient to init analytics
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";
    import {setContext} from "svelte";

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId
        })
    }

    export let booking_setup;

    if (booking_setup) {
        setContext("booking_setup", booking_setup);
    }
</script>

<div class="root">
    <slot></slot>
</div>


<style lang="scss">
  .root {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex: 1 1 auto;
    position: relative;
  }
</style>
