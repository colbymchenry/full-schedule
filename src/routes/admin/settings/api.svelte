<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import Section from '$lib/forms/section.svelte';
    import Row from '$lib/forms/row.svelte';
    import Select from '$lib/forms/select.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import GoogleOAuthHandler from './google-oauth-handler.svelte';
    import axios from "axios";
    import {ApiProgressBar} from "../../../lib/ApiProgressBar.js";
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../../utils/logger.js";
    import {
        iconApi, iconCalendar, iconEvent,
        iconFingerprint, iconFreeAvailable,
        iconGoogle, iconKey, iconLan,
        iconPhone,
        iconToken,
        iconTravelExplore,
        iconUser
    } from "../../../lib/icons.js";
    import {auth, settings} from "../../../lib/stores.js";

    let form_errors = {};

    async function onSubmit(formData) {
        ApiProgressBar.start()

        try {
            await FirebaseClient.update("settings", "main", formData);
        } catch (e) {
            showToast()
        }

        ApiProgressBar.stop();
    }

    async function loginWithGoogle() {
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        try {
            axios.defaults.headers.common['authorization'] = await $auth.getIdToken();
            const {data} = await axios.post("/api/google-oauth-url", {
                baseUrl
            });
            window.location.href = data;
        } catch (e) {
            showToast()
        }
    }

</script>

<GoogleOAuthHandler/>

<Form onSubmit={onSubmit}>
    <Section title="Google"
             info={'API keys used for various Google APIs. <a href="https://console.cloud.google.com/welcome" target="_blank">Go to Google console.</a>'}>
        <Row>
            {#if !$settings.get("google.token")}
                <!-- Needs to OAuth with Google Business Account -->
                <Button icon={iconGoogle} color="input" type="button" callback={loginWithGoogle}>Login with Google
                </Button>
            {:else if !$settings.get("google.calendars.appointments")}
                <!-- Needs to select their Google Calendar -->
                <Select label="Appointment Calendar" hint="Calendar used to keep track of appointments."
                        name="google.calendars.appointments" icon={iconEvent}
                        value={$settings.get("google.calendars.appointments")}>
                    <!--{#each states as state}-->
                    <!--    <option value={state.value}-->
                    <!--            selected={state.value === $settings.get("address.state")}>{state.label}</option>-->
                    <!--{/each}-->
                </Select>
                <Select label="Scheduling Calendar" hint="Calendar used to keep track of employee schedules."
                        name="google.calendars.schedules" icon={iconFreeAvailable}
                        value={$settings.get("google.calendars.schedules")}>
                    <!--{#each states as state}-->
                    <!--    <option value={state.value}-->
                    <!--            selected={state.value === $settings.get("address.state")}>{state.label}</option>-->
                    <!--{/each}-->
                </Select>
            {:else}
                <!-- Is all good -->

            {/if}
        </Row>
    </Section>

    <Separator/>

    <Section title="Twilio SMS"
             info={'This service is used for SMS texting. <a href="https://www.twilio.com/try-twilio" target="_blank">Go to sign up page.</a>'}>
        <Row>
            <InputField label="SID" name="twilio.sid" icon={iconFingerprint} value={$settings.get("twilio.sid")}
            />
            <InputField label="Auth Token" name="twilio.token" icon={iconToken} value={$settings.get("twilio.token")}
            />
            <InputField label="MSID" name="twilio.msid" icon={iconFingerprint} value={$settings.get("twilio.msid")}
            />
            <InputField label="Phone Number" type="tel" name="twilio.number" icon={iconPhone}
                        value={$settings.get("twilio.number")}
                        alwaysShowMask
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />
        </Row>
    </Section>

    <Separator/>

    <Section title="TextMagic"
             info={'This service is used for scheduled text reminders. <a href="https://my.textmagic.com/register/" target="_blank">Go to sign up page.</a>'}>
        <Row>
            <InputField label="Username" name="textmagic.username" icon={iconUser}
                        value={$settings.get("textmagic.username")}
            />
            <InputField label="API Key" name="textmagic.apikey" icon={iconApi} value={$settings.get("textmagic.apikey")}
            />
        </Row>
    </Section>

    <Separator/>

    <Section title="Email" info={'This service is used for all emails within Full Schedule.'}>
        <Row>
            <InputField label="Host/IP" name="email.host" icon={iconTravelExplore} value={$settings.get("email.host")}
            />
            <InputField label="Port" name="email.port" icon={iconLan} value={$settings.get("email.port")}
            />
            <InputField label="Username" name="email.username" icon={iconUser} value={$settings.get("email.username")}
            />
            <InputField label="Password" name="email.password" icon={iconKey} value={$settings.get("email.password")}
            />
        </Row>
    </Section>

    <Separator/>

    <Section title="Clover"
             info={'This service is used for payment processing and inventory management. <a href="https://connect.clover.com/get-started" target="_blank">Go here to sign up.</a>'}>
        <Row>
            <InputField label="E-Commerce Token (Private)" name="clover.ecomtoken" icon={iconToken}
                        value={$settings.get("clover.ecomtoken")}
            />
            <InputField label="API Tokens (Private)" name="clover.apitoken" icon={iconToken}
                        value={$settings.get("clover.apitoken")}
            />
            <InputField label="Merchant ID" name="clover.merchantid" icon={iconFingerprint}
                        value={$settings.get("clover.merchantid")}
            />
            <InputField label="App ID" name="clover.appid" icon={iconFingerprint} value={$settings.get("clover.appid")}
            />
        </Row>
    </Section>

    <Separator/>

    <Section title="Facebook Pixel" info={'This service is used for Facebook Pixel integration.'}>
        <Row>
            <InputField label="Pixel ID" name="facebook.pixel_id" icon={iconFingerprint}
                        value={$settings.get("facebook.pixel_id")}
            />
        </Row>
    </Section>
</Form>