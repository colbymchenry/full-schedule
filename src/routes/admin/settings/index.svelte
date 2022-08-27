<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Row from '$lib/forms/row.svelte';
    import Form from '$lib/forms/form.svelte';
    import Section from '$lib/forms/section.svelte';
    import {ApiProgressBar} from "../../../lib/ApiProgressBar.js";
    import {showToast} from "../../../utils/logger.js";
    import {iconMail, iconPerson, iconPhone} from "../../../lib/icons.js";
    import {auth} from "../../../lib/stores.js";
    import {Api} from "../../../utils/Api.js";

    let form_errors = {};

    async function onSubmit(data) {
        ApiProgressBar.start();
        try {
            // update Google User in the backend
            await Api.patch('/api/user', {
                uid: $auth.uid,
                displayName: data.name,
                phoneNumber: data.phone
            })
        } catch (error) {
            showToast(error?.message);
        }

        ApiProgressBar.stop();
    }

</script>


<Form onSubmit={onSubmit}>
    <Section title="Profile" info="Following information is publicly displayed, be careful!">
        <InputField label="Name" name="name" icon={iconPerson} value={$auth?.displayName}/>
        <Row>
            <InputField label="Email" type="email" name="email" icon={iconMail} value={$auth?.email} readOnly
                        hint="Server administrator access only."/>
            <InputField label="Phone" type="tel" name="phone" icon={iconPhone} value={$auth?.phoneNumber}
                        alwaysShowMask
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />
        </Row>
    </Section>
</Form>