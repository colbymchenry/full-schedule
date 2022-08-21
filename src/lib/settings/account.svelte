<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Row from '$lib/forms/row.svelte';
    import Form from '$lib/forms/form.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import Footer from '$lib/forms/footer.svelte';
    import {iconMail, iconPerson, iconPhone} from "../icons.js";
    import {authStore} from "../stores.js";
    import axios from "axios";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {showToastError} from "../../utils/logger.js";

    let response;
    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(data) {
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
    <Section title="Profile" info="Following information is publicly displayed, be careful!">
        <InputField label="Name" name="name" icon={iconPerson} bind:value={auth["displayName"]} />
        <Row>
            <InputField label="Email" type="email" name="email" icon={iconMail} bind:value={auth["email"]} readOnly
                        hint="Server administrator access only."/>
            <InputField label="Phone" type="tel" name="phone" icon={iconPhone} bind:value={auth["phoneNumber"]}
                        alwaysShowMask
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />
        </Row>
    </Section>
    <Separator/>
    <Footer bind:submitted={response} />
</Form>