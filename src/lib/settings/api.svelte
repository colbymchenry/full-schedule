<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import {
        iconApi,
        iconFingerprint,
        iconKey,
        iconLan,
        iconPhone,
        iconToken,
        iconTravelExplore,
        iconUser
    } from "../icons.js";
    import {authStore, settings} from "../stores.js";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {showToast} from "../../utils/logger.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";

    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(formData) {
        ApiProgressBar.start()

        try {
            await FirebaseClient.update("settings", "main", formData);
        } catch (e) {
            showToast()
        }

        ApiProgressBar.stop();
    }

</script>

<Form onSubmit={onSubmit}>
    <Section title="Twilio SMS" info={'This service is used for SMS texting. <a href="https://www.twilio.com/try-twilio" target="_blank">Go to sign up page.</a>'}>
        <Row>
            <InputField label="SID" name="twilio.sid" icon={iconFingerprint} value={$settings.get("twilio.sid")}
            />
            <InputField label="Auth Token" name="twilio.token" icon={iconToken} value={$settings.get("twilio.token")}
            />
            <InputField label="MSID" name="twilio.msid" icon={iconFingerprint} value={$settings.get("twilio.msid")}
            />
            <InputField label="Phone Number" type="tel" name="twilio.number" icon={iconPhone} value={$settings.get("twilio.number")}
                        alwaysShowMask
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />
        </Row>
    </Section>

    <Separator />

    <Section title="TextMagic" info={'This service is used for scheduled text reminders. <a href="https://my.textmagic.com/register/" target="_blank">Go to sign up page.</a>'}>
        <Row>
            <InputField label="Username" name="textmagic.username" icon={iconUser} value={$settings.get("textmagic.username")}
            />
            <InputField label="API Key" name="textmagic.apikey" icon={iconApi} value={$settings.get("textmagic.apikey")}
            />
        </Row>
    </Section>

    <Separator />

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

    <Separator />

    <Section title="Clover" info={'This service is used for payment processing and inventory management. <a href="https://connect.clover.com/get-started" target="_blank">Go here to sign up.</a>'}>
        <Row>
            <InputField label="E-Commerce Token (Private)" name="clover.ecomtoken" icon={iconToken} value={$settings.get("clover.ecomtoken")}
            />
            <InputField label="API Tokens (Private)" name="clover.apitoken" icon={iconToken} value={$settings.get("clover.apitoken")}
            />
            <InputField label="Merchant ID" name="clover.merchantid" icon={iconFingerprint} value={$settings.get("clover.merchantid")}
            />
            <InputField label="App ID" name="clover.appid" icon={iconFingerprint} value={$settings.get("clover.appid")}
            />
        </Row>
    </Section>

    <Separator />

    <Section title="Facebook Pixel" info={'This service is used for Facebook Pixel integration.'}>
        <Row>
            <InputField label="Pixel ID" name="facebook.pixel_id" icon={iconFingerprint} value={$settings.get("facebook.pixel_id")}
            />
        </Row>
    </Section>
</Form>