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
    import Swal from "sweetalert2";

    let response;
    let form_errors = {};
    let auth = $authStore || {};

    async function onSubmit(data) {
        try {
            // update Google User in the backend
            axios.defaults.headers.common['authorization'] = await $authStore.getIdToken();
            await axios.patch('/api/user', {
                uid: $authStore.uid,
                displayName: data.displayName,
                phoneNumber: data.phone
            });
        } catch (error) {
            Swal.fire({
                title: "Server error. Please try again later.",
                timer: 3000,
                timerProgressBar: true,
                toast: true
            });
        }
    }

</script>


<Form onSubmit={onSubmit}>
    <Section title="Profile" info="Following information is publicly displayed, be careful!">
        <InputField label="Name" name="name" icon={iconPerson} bind:value={auth["displayName"]}  hint="Server administrator access only." />
        <Row>
            <InputField label="Email" type="email" name="email" icon={iconMail} bind:value={auth["email"]} readOnly
                        hint="Server administrator access only."/>
            <InputField label="Phone" type="tel" name="phone" icon={iconPhone} bind:value={auth["phoneNumber"]} hint="Server administrator access only."
                        alwaysShowMask
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />
        </Row>
    </Section>
    <Separator/>
    <Footer/>
</Form>