<script>
    import {webVitals} from '$lib/vitals';
    import {page} from '$app/stores';
    import '../app.css';
    import {browser} from "$app/env";
    // have to import FirebaseClient to init analytics
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";

    let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

    $: if (browser && analyticsId) {
        webVitals({
            path: $page.url.pathname,
            params: $page.params,
            analyticsId
        })
    }



</script>


<slot></slot>


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
