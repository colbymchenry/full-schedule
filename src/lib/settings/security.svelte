<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import {iconKey} from "../icons.js";
    import {authStore} from "../stores.js";
    import axios from "axios";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {showToast} from "../../utils/logger.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";

    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(data) {
        if (data["password"].length < 8) {
            form_errors["password"] = "Your new password must be at least 8 characters long.";
            form_errors = form_errors;
            return;
        }

        if (data["password"].length > 15) {
            form_errors["password"] = "Your new password must be less than 16 characters long.";
            form_errors = form_errors;
            return;
        }

        if (!data["password"].match(FirebaseClient.passwordRegex)) {
            form_errors["password"] = "Your new password must include numbers, letters and special characters.";
            form_errors = form_errors;
            return;
        }

        if (data["password"] !== data["old_password"]) {
            form_errors["password"] = "Passwords do not match.";
            form_errors = form_errors;
            return;
        }

        ApiProgressBar.start();
        try {
            axios.defaults.headers.common['authorization'] = await $authStore.getIdToken();
            await axios.patch('/api/user', {
                uid: $authStore.uid,
                password: data.password
            });
        } catch (error) {
            showToast(error?.message);
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
