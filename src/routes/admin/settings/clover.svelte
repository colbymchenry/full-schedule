<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import Section from '$lib/forms/section.svelte';
    import Row from '$lib/forms/row.svelte';
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../../utils/logger.js";
    import {iconFingerprint, iconToken,} from "../../../lib/icons.js";
    import {settings} from "../../../lib/stores.js";
    import {ApiProgressBar} from "../../../utils/ApiProgressBar.js";

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

</script>

<Form onSubmit={onSubmit}>
    <Section title="API Keys"
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
</Form>