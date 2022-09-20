<script>
    import Nav from '$lib/__layout/nav.svelte';
    import TopBar from '$lib/__layout/top-bar.svelte';
    import RightBar from '$lib/__layout/right-bar.svelte';
    import {page} from '$app/stores';
    import {auth, progressBarStore, settings} from '$lib/stores.js';
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {goto} from "$app/navigation";
    import {prettyLog} from "../../utils/logger.js";
    import ApiProgressBar from '$lib/__layout/api-progress-bar.svelte';
    import {browser} from "$app/env";
    import {JsonHelper} from "../../utils/JsonHelper.js";
    import {toasts} from "../../lib/stores.js";

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
                $settings = new JsonHelper(data);
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
<!--  If there are any toast objects, render them one by one in a que, delete -> NEXT  -->
    {#if $toasts.length}
        <div class="modal-overlay">
            <div class="container">
                <svelte:component this={$toasts[0].component}/>
            </div>
        </div>
    {/if}
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

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
    }

    .container {
      z-index: 11;
    }
  }
</style>
