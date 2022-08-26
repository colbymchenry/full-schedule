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
    <Section title="Name & Phone Number" info="Following information is publicly displayed, be careful!">
        <Row>
            <InputField label="Name" name="store.name" icon={iconStore} value={$settings.get("store.name")}
            />
            <InputField label="Phone" type="tel" name="store.phone" icon={iconPhone}
                        value={$settings.get("store.phone")}
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
            <InputField label="Street Address (Line 1)" name="address.street1" icon={iconRoadSign}
                        value={$settings.get("address.street1")}
                        disablePrefill/>
            <InputField label="Street Address (Line 2)" name="address.street2" icon={iconRoadSign}
                        value={$settings.get("address.street2")}
                        disablePrefill/>
            <Select label="State" name="address.state" icon={iconState} value={$settings.get("address.state")}>
                {#each states as state}
                    <option value={state.value}
                            selected={state.value === $settings.get("address.state")}>{state.label}</option>
                {/each}
            </Select>
            <InputField label="City" name="address.city" icon={iconCity} value={$settings.get("address.city")}
                        disablePrefill/>
            <InputField label="Zip" name="address.zip" icon={iconMap} value={$settings.get("address.zip")}
                        disablePrefill/>
            <Select label="Timezone" name="address.timezone" icon={iconClock}
                    value={$settings.get("address.timezone")}>
                {#each timezones as timezone}
                    <option value={timezone.value}
                            selected={timezone.value === $settings.get("address.timezone")}>{timezone.label}</option>
                {/each}
            </Select>
        </Row>
    </Section>

    <Separator/>

    <Section title="Socials" info="This will be used in emails, SMS messages, and booking process.">
        <Row>
            <InputField label="TikTok" name="socials.tiktok" icon={iconTiktok}
                        value={$settings.get("socials.tiktok")}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Instagram" name="socials.instagram" icon={iconInstagram}
                        value={$settings.get("socials.instagram")}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Facebook" name="socials.facebook" icon={iconFacebook}
                        value={$settings.get("socials.facebook")}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="YouTube" name="socials.youtube" icon={iconYoutube}
                        value={$settings.get("socials.youtube")}
                        placeholder="Enter account name" disablePrefill/>
            <InputField label="Twitter" name="socials.twitter" icon={iconTwitter}
                        value={$settings.get("socials.twitter")}
                        placeholder="Enter account name" disablePrefill/>
        </Row>
    </Section>
</Form>