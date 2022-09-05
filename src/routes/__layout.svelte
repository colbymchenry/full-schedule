<script>
    import '../app.css';
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";

    import {webVitals} from '$lib/vitals';
    import {page} from '$app/stores';
    import {browser} from "$app/env";

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