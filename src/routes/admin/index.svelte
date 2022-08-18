<script>
    import IconLogo from '$lib/svgs/icon-logo.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Checkbox from '$lib/forms/checkbox.svelte';
    import Form from '$lib/forms/form.svelte';
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {goto} from "$app/navigation";
    import {browser} from "$app/env";
    import {setContext} from "svelte";

    let response;
    let form_errors = {};

    async function onSubmit(data) {
        try {
            response = await FirebaseClient.signIn(data["email"], data["password"]);
            // set global user context
            setContext("user", response);
            // if in the browser store to local storage so can be used across the app in __layout it's picked back
            // up on page reloads
            if (browser) {
                localStorage.setItem("user", JSON.stringify(response));
            }
            // send user to dashboard
            await goto("/admin/clients");
        } catch (error) {
            if (error?.code === 'auth/user-not-found') {
                form_errors['email'] = "User not found.";
            } else if (error?.code === 'auth/wrong-password') {
                form_errors['password'] = "Wrong password."
            }

            form_errors = form_errors;
        }
    }
</script>

<svelte:head>
    <title>FS • Admin Login</title>
</svelte:head>

<div id="w-node-_07a03dc8-0e71-e5a0-6931-ad52994fa8d8-6c7318ad" class="login__container">
    <div id="w-node-f7b1ee02-5c12-9b13-de5e-82ee3d4253a0-6c7318ad" class="login__left">
        <div id="w-node-_7edf5dde-158e-bc96-eb1c-82c2ba7fcb45-6c7318ad" class="login__left-logo w-embed">
            <IconLogo/>
        </div>
        <h1 id="w-node-_01e9b4a3-b662-86cf-c321-f91c80fe1102-6c7318ad" class="login__left-heading">Sign in</h1>
        <div id="w-node-_4633a2d0-ace4-bdec-6b93-6749e428aee7-6c7318ad" class="login__left-signup">Don&#x27;t have an
            account? <a href="#">Sign up</a>
        </div>
        <div id="w-node-a5e2250b-0bbc-b612-3111-3b30913822d3-6c7318ad" class="form-block w-form">
            <Form className="login-form" onSubmit={onSubmit}>
                <InputField form_errors={form_errors} name="email" type="email" placeholder="Email *" required />
                <InputField form_errors={form_errors} name="password" type="password" placeholder="Password *" required />
                <div class="login-form__toolbar">
                    <Checkbox name="remember" label="Remember me" id="w-node-_8c02cc1c-30c3-b1f0-0b0f-f8dcf0c03a6a-6c7318ad" />
                    <a id="w-node-fb80c1d2-f737-0e05-7ae7-84fef4865a34-6c7318ad" href="#">Forgot password?</a>
                </div>
                <input type="submit" data-wait="Please wait..." value="Sign in"
                       class="primary-button w-button">
            </Form>
        </div>
    </div>
    <div id="w-node-_988bb279-feee-8507-17b1-aec4c13b494b-6c7318ad" class="login__right">
        <div class="login__right-content">
            <h1 class="right-content__heading">Welcome to<br>Full Schedule</h1>
            <div id="w-node-_967f52cc-d6c3-8ca5-1700-757c8aabd717-6c7318ad" class="right-content__copy">Full Schedule
                helps business owners keep all of their operations under one platform by offering: scheduling, payment
                processing, client and staff management, marketing analytics, revenue reports, and more.
            </div>
        </div>
        <div class="login__right-graphic w-embed">
            <svg viewbox="0 0 960 540" width="100%" height="100%" preserveaspectratio="xMidYMax slice"
                 xmlns="http://www.w3.org/2000/svg">
                <g class="opacity-20 MuiBox-root muiltr-1wnrr1p" fill="none" stroke="currentColor" stroke-width="100">
                    <circle r="234" cx="196" cy="23"></circle>
                    <circle r="234" cx="790" cy="491"></circle>
                </g>
            </svg>
        </div>
        <div class="login__right-graphic is--dots w-embed">
            <svg viewbox="0 0 220 192" fill="none">
                <defs>
                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20"
                             patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
            </svg>
        </div>
    </div>
</div>

<style>
    body {
        background-color: var(--bg-color);
    }
</style>
