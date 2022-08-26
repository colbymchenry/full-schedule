<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Select from '$lib/forms/select.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import states from '../../assets/states.json';
    import timezones from '../../assets/timezones.json';
    import {
        iconCity,
        iconClock, iconFacebook, iconInstagram,
        iconMap,
        iconPhone,
        iconRoadSign,
        iconState,
        iconStore, iconTiktok,
        iconTwitter, iconYoutube
    } from "../icons.js";
    import {authStore} from "../stores.js";

    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(formData) {

    }
</script>

<Form onSubmit={onSubmit}>
    <Section title="Name & Phone Number" info="Following information is publicly displayed, be careful!">
        <Row>
            <InputField label="Name" name="name" icon={iconStore} bind:value={auth["email"]}
            />
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

    <Section title="Address & Timezone" info="This will be used in emails, SMS messages, and booking process.">
        <Row>
            <InputField label="Street Address (Line 1)" name="address__street1" icon={iconRoadSign} bind:value={auth["email"]}
                        disablePrefill/>
            <InputField label="Street Address (Line 2)" name="address__street2" icon={iconRoadSign} bind:value={auth["email"]}
                        disablePrefill/>
            <Select label="State" name="address__state" icon={iconState}>
                {#each states as state}
                    <option value={state.value}>{state.label}</option>
                {/each}
            </Select>
            <InputField label="City" name="address__city" icon={iconCity} bind:value={auth["email"]} disablePrefill/>
            <InputField label="Zip" name="address__zip" icon={iconMap} bind:value={auth["email"]} disablePrefill/>
            <Select label="Timezone" name="address__timezone" icon={iconClock}>
                {#each timezones as timezone}
                    <option value={timezone.value}>{timezone.label}</option>
                {/each}
            </Select>
        </Row>
    </Section>

    <Separator/>

    <Section title="Socials" info="This will be used in emails, SMS messages, and booking process.">
        <Row>
            <InputField label="TikTok" name="socials__tiktok" icon={iconTiktok} bind:value={auth["email"]}
                        disablePrefill/>
            <InputField label="Instagram" name="socials__instagram" icon={iconInstagram} bind:value={auth["email"]}
                        disablePrefill/>
            <InputField label="Facebook" name="socials__facebook" icon={iconFacebook} bind:value={auth["email"]} disablePrefill/>
            <InputField label="YouTube" name="socials__youtube" icon={iconYoutube} bind:value={auth["email"]} disablePrefill/>
            <InputField label="Twitter" name="socials__twitter" icon={iconTwitter} bind:value={auth["email"]} disablePrefill/>
        </Row>
    </Section>
</Form>