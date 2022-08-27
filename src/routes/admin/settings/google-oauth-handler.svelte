<script>
    import {browser} from "$app/env";
    import {showToast} from "../../../utils/logger.js";
    import {auth} from "../../../lib/stores.js";
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {Api} from "../../../utils/Api.js";

    let searching = false;

    $: if (browser && $auth && !searching) {
        searching = true;
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has("code")) {
            (async () => {
                try {
                    let { data } = await Api.post('/api/google-oauth-url', {
                        code: searchParams.get("code"),
                        baseUrl
                    })

                    await FirebaseClient.update("settings", "main", {
                        "google": {
                            "token": data
                        }
                    });
                    history.pushState({}, null, "/admin/settings/api");
                } catch (e) {
                    showToast()
                    console.error(e)
                }
            })();
        }
    }
</script>