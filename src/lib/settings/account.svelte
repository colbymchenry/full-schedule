<script>
    import Section from '../forms/section.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Row from '$lib/forms/row.svelte';
    import {iconMail, iconPerson, iconPhone} from "../icons.js";
</script>

<Section title="Profile" info="Following information is publicly displayed, be careful!">
    <InputField label="Name" name="name" icon={iconPerson} />
    <Row>
        <InputField label="Email" type="email" name="email" icon={iconMail} />
        <InputField label="Phone" type="tel" name="phone" icon={iconPhone} />
    </Row>
</Section>