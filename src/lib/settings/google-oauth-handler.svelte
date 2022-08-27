<script>
    import {browser} from "$app/env";
    import {auth} from "../stores.js";
    import axios from "axios";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../utils/logger.js";

    export let activeRoute, routes;

    let searching = false;

    $: if (browser && $auth && !searching) {
        searching = true;
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("code")) {
            (async () => {
                try {
                    axios.defaults.headers.common['authorization'] = await $auth.getIdToken();
                    let { data } = await axios.post("/api/google-oauth-url", {
                        code: searchParams.get("code"),
                        baseUrl
                    });

                    await FirebaseClient.update("settings", "main", { "google": data });
                    history.pushState({}, null, "/admin/settings");
                    activeRoute = routes[routes.length - 1]
                } catch (e) {
                    showToast()
                    console.error(e)
                }
            })();
        }
    }
</script>