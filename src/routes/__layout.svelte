<script>
    import Nav from '$lib/__layout/nav.svelte';
    import TopBar from '$lib/__layout/top-bar.svelte';
    import {webVitals} from '$lib/vitals';
    import {browser} from '$app/env';
    import {page} from '$app/stores';
    import '../app.css';
    import {getContext, setContext} from "svelte";
    import {goto} from "$app/navigation";
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId
        })
    }

    let user = getContext("user");

    // THIS RUNS EVERY PAGE UPDATE with :$ if
    // check if user is authenticated by looking for user data in local storage
    $: if (browser) {

        FirebaseClient.auth().onIdTokenChanged(user => {
            if (user) localStorage.setItem("user", JSON.stringify(user));
        });

        FirebaseClient.auth().onAuthStateChanged(user => {
            if (user) localStorage.setItem("user", JSON.stringify(user));
        });

        if (!user && localStorage.getItem("user")) {
            setContext("user", JSON.parse(localStorage.getItem("user")))
            user = JSON.parse(localStorage.getItem("user"));
        }

        if (user?.providerData[0].photoURL) {
            console.log(user?.providerData[0].photoURL)
        }

        // logout if on admin route but there is no user logged in
        if ($page.url.pathname !== '/admin') {
            if (!user) {
                goto("/admin");
            }
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
