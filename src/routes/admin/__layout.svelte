<script>
    import Nav from '$lib/__layout/nav.svelte';
    import TopBar from '$lib/__layout/top-bar.svelte';
    import RightBar from '$lib/__layout/right-bar.svelte';
    import {webVitals} from '$lib/vitals';
    import {page} from '$app/stores';
    import '../../app.css';
    import {auth, progressBarStore, settings} from '$lib/stores.js';
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {goto} from "$app/navigation";
    import {prettyLog} from "../../utils/logger.js";
    import ApiProgressBar from '$lib/__layout/api-progress-bar.svelte';
    import {browser} from "$app/env";
    import {JsonHelper} from "../../utils/JsonHelper.js";


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
                auth.set(user);
                prettyLog("AUTHENTICATION UPDATED");
            } else {
                prettyLog("LOGGED OUT");

                if ($page.url.pathname !== '/admin' &&
                    $page.url.pathname !== '/admin/reset-password' &&
                    $page.url.pathname !== '/admin/forgot-password') {
                    goto("/admin");
                }
            }
        });
        if (!Object.keys($settings.object).length) {
            FirebaseClient.doc("settings", "main").then((data) => {
                if (!data) return;
                const jsonObj = new JsonHelper(data);
                settings.set(jsonObj)
            })

        }
    }
</script>


{#if
    $page.url.pathname !== '/admin' &&
    $page.url.pathname !== '/admin/reset-password' &&
    $page.url.pathname !== '/admin/forgot-password'
}
    {#if $progressBarStore}
        <ApiProgressBar/>
    {/if}
    <div class="root">
        <Nav/>
        <TopBar>
            <slot></slot>
        </TopBar>
        <RightBar/>
    </div>
{:else}
    <slot/>
{/if}

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
