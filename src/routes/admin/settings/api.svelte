<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import Section from '$lib/forms/section.svelte';
    import Row from '$lib/forms/row.svelte';
    import Select from '$lib/forms/select.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import GoogleOAuthHandler from './google-oauth-handler.svelte';
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../../utils/logger.js";
    import {
        iconApi,
        iconEvent,
        iconFingerprint,
        iconFreeAvailable,
        iconGoogle,
        iconKey,
        iconLan,
        iconPhone,
        iconToken,
        iconTravelExplore,
        iconUser
    } from "../../../lib/icons.js";
    import {settings} from "../../../lib/stores.js";
    import {Api} from "../../../utils/Api.js";
    import {ApiProgressBar} from "../../../utils/ApiProgressBar.js";
    import {onMount} from "svelte";
    import Swal from "sweetalert2";
    import _ from "lodash";
    import {browser} from "$app/env";

    let form_errors = {};
    let calendars = [];

    async function onSubmit(formData) {
        ApiProgressBar.start()

        try {
            let oldSettings = await FirebaseClient.doc("settings", "main");
            await FirebaseClient.update("settings", "main", _.merge(oldSettings, formData));
        } catch (e) {
            showToast()
            console.error(e);
        }

        ApiProgressBar.stop();
    }

    async function loginWithGoogle() {
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        try {
            const { authorizationUrl } = await Api.post('/api/google-oauth-url', { baseUrl });
            window.location.href = authorizationUrl;
        } catch (e) {
            showToast()
            console.error(e);
        }
    }


    onMount(async () => {
        if (!calendars.length && browser) {
            try {
                const { data } = await Api.get("/api/google-calendar");
                calendars = data.filter(({
                                            accessRole,
                                            id,
                                            summary
                                        }) => accessRole === "owner" && id !== summary).map(({
                                                                                                 summary,
                                                                                                 id,
                                                                                                 timeZone
                                                                                             }) => {
                    return {
                        summary, id, timeZone
                    }
                });
            } catch (e) {
                showToast();
                console.error(e);
            }
        }
    });

    async function onCalendarChange(e) {
        if (e.target.value !== "create") return;

        const create = await Swal.fire({
            title: "Are you sure?",
            html: "This will create a new Google calendar called<br /><b>'Full Schedule - MASTER'</b>",
            icon: 'warning',
            confirmButtonText: 'Create',
            denyButtonText: 'Cancel',
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonColor:  "var(--fuse-primary)",
            denyButtonColor: "var(--fuse-accent-500)",
            backdrop: true
        });

        if (!create.isConfirmed) return;

        try {

        } catch (error) {
            showToast();
            console.error(error);
        }

    }

</script>

<GoogleOAuthHandler/>

<Form onSubmit={onSubmit}>
    <Section title="Google"
             info={'API keys used for various Google APIs. <a href="https://console.cloud.google.com/welcome" target="_blank">Go to Google console.</a>'}>
        <Row>
            {#if !$settings.object?.google?.token}
                <!-- Needs to OAuth with Google Business Account -->
                <Button icon={iconGoogle} color="input" type="button" callback={loginWithGoogle}>Login with Google
                </Button>
            {:else}
                <!-- Needs to select their Google Calendar -->
                <Select label="Appointment Calendar" hint="Calendar used to keep track of appointments."
                        name="google.calendars.appointments" icon={iconEvent}
                        value={$settings.object?.google?.calendars?.appointments} onChange={onCalendarChange}>
                    {#each calendars as calendar}
                        <option value={calendar.id}>{calendar.summary}</option>
                    {/each}
                    <option value={"create"}>Create Calendar</option>
                </Select>
                <Select label="Scheduling Calendar" hint="Calendar used to keep track of employee schedules."
                        name="google.calendars.schedules" icon={iconFreeAvailable}
                        value={$settings.get("google.calendars.schedules")}>
                    <!--{#each states as state}-->
                    <!--    <option value={state.value}-->
                    <!--            selected={state.value === $settings.get("address.state")}>{state.label}</option>-->
                    <!--{/each}-->
                </Select>
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

    <Section title="Facebook Pixel" info={'This service is used for Facebook Pixel integration.'}>
        <Row>
            <InputField label="Pixel ID" name="facebook.pixel_id" icon={iconFingerprint}
                        value={$settings.get("facebook.pixel_id")}
            />
        </Row>
    </Section>
</Form>