<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import {iconKey} from "../icons.js";
    import {authStore} from "../stores.js";
    import axios from "axios";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {showToastError} from "../../utils/logger.js";

    let response;
    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(data) {
        if (data["old_password"] !== data["password"]) {
            form_errors["password"] = "Passwords do not match.";
            form_errors = form_errors;
            return;
        }

        ApiProgressBar.start();
        try {
            // update Google User in the backend
            axios.defaults.headers.common['authorization'] = await $authStore.getIdToken();
            response = await axios.patch('/api/user', {
                uid: $authStore.uid,
                displayName: data.name,
                phoneNumber: data.phone
            });
        } catch (error) {
            response = null;
            showToastError();
        }

        ApiProgressBar.stop();
    }

</script>

<Form onSubmit={onSubmit}>
    <Section title="Change your password" info="Pro tip: Never share your password.">
        <InputField label="Current password" type="password" name="old_password" icon={iconKey} required
                    bind:form_errors={form_errors}/>
        <InputField label="New password" type="password" name="password" icon={iconKey} required
                    bind:form_errors={form_errors}
                    info="Minimum 8 characters. Must include numbers, letters and special characters."/>
    </Section>
</Form>
