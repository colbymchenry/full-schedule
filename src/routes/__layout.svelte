<script>
    import Nav from '$lib/__layout/nav.svelte';
    import TopBar from '$lib/__layout/top-bar.svelte';
    import {webVitals} from '$lib/vitals';
    import {browser} from '$app/env';
    import {page} from '$app/stores';
    import '../app.css';
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";
    import {authStore} from "../lib/stores.js";
    import {goto} from "$app/navigation";
    import {prettyLog} from "../utils/logger.js";

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId
        })
    }

    $: if (browser) {
        FirebaseClient.auth().onAuthStateChanged((user) => {
            if (user) {
                $authStore = user;
                prettyLog("AUTHENTICATION UPDATED");
            } else {
                prettyLog("LOGGED OUT");
                goto("/admin");
            }
        })
    }
</script>


{#if $page.url.pathname !== '/admin' }
    <div class="root">
        <Nav/>
        <TopBar/>
    </div>
{:else}
    <slot/>
{/if}


<footer>
</footer>

<style lang="scss">
  .root {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    display: flex;
    flex: 1 1 auto;
  }
</style>
