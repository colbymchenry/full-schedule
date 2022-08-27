<script>
    import {browser} from "$app/env";
    import axios from "axios";
    import {showToast} from "../../../utils/logger.js";
    import {auth} from "../../../lib/stores.js";
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";

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
                    history.pushState({}, null, "/admin/settings/api");
                } catch (e) {
                    showToast()
                    console.error(e)
                }
            })();
        }
    }
</script>