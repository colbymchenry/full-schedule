<script>
    import Nav from '$lib/__layout/nav.svelte';
    import RightBar from '$lib/__layout/right-bar.svelte';
    import TopBar from '$lib/__layout/top-bar.svelte';
    import {webVitals} from '$lib/vitals';
    import {browser} from '$app/env';
    import {page} from '$app/stores';
    import '../app.css';
    import {setContext} from "svelte";

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId
        })
    }

    // check if user is authenticated by looking for user data in local storage
    $: if (browser) {
        if (localStorage.getItem("user")) {
            // store user data in context to be used across the app
            setContext("user", JSON.parse(localStorage.getItem("user")));
        }
    }
</script>


{#if $page.url.pathname !== '/admin' }
    <div class="root">
        <Nav/>
        <TopBar/>
        <!--        <div class="main-container">-->
        <!--            <TopBar/>-->
        <!--            <slot/>-->
        <!--            <RightBar/>-->
        <!--        </div>-->
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
