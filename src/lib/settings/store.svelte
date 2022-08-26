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
    import {authStore, settingsStore} from "../stores.js";
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
    <Section title="Name & Phone Number" info="Following information is publicly displayed, be careful!">
        <Row>
            <InputField label="Name" name="store__name" icon={iconStore} bind:value={$settingsStore["store"]["name"]}
            />
            <InputField label="Phone" type="tel" name="store__phone" icon={iconPhone}
                        bind:value={$settingsStore["store"]["phone"]}
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
            <InputField label="Street Address (Line 1)" name="address__street1" icon={iconRoadSign}
                        bind:value={$settingsStore["address"]["street1"]}
                        disablePrefill/>
            <InputField label="Street Address (Line 2)" name="address__street2" icon={iconRoadSign}
                        bind:value={$settingsStore["address"]["street2"]}
                        disablePrefill/>
            <Select label="State" name="address__state" icon={iconState}
                    bind:value={$settingsStore["address"]["state"]}>
                {#each states as state}
                    <option value={state.value}
                            selected={state.value === $settingsStore["address"]["state"]}>{state.label}</option>
                {/each}
            </Select>
            <InputField label="City" name="address__city" icon={iconCity} bind:value={$settingsStore["address"]["city"]}
                        disablePrefill/>
            <InputField label="Zip" name="address__zip" icon={iconMap} bind:value={$settingsStore["address"]["zip"]}
                        disablePrefill/>
            <Select label="Timezone" name="address__timezone" icon={iconClock}
                    bind:value={$settingsStore["address"]["timezone"]}>
                {#each timezones as timezone}
                    <option value={timezone.value}
                            selected={timezone.value === $settingsStore["address"]["timezone"]}>{timezone.label}</option>
                {/each}
            </Select>
        </Row>
    </Section>

    <Separator/>

    <Section title="Socials" info="This will be used in emails, SMS messages, and booking process.">
        <Row>
            <InputField label="TikTok" name="socials__tiktok" icon={iconTiktok}
                        bind:value={$settingsStore["socials"]["tiktok"]}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Instagram" name="socials__instagram" icon={iconInstagram}
                        bind:value={$settingsStore["socials"]["instagram"]}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Facebook" name="socials__facebook" icon={iconFacebook}
                        bind:value={$settingsStore["socials"]["facebook"]}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="YouTube" name="socials__youtube" icon={iconYoutube}
                        bind:value={$settingsStore["socials"]["youtube"]}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Twitter" name="socials__twitter" icon={iconTwitter}
                        bind:value={$settingsStore["socials"]["twitter"]}
                        placeholder="Enter account name" disablePrefill/>
        </Row>
    </Section>
</Form>