<script>
    import {iconLogo, iconMail, iconPerson, iconPhone} from "$lib/icons.js";
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import {FormHelper} from "../../utils/FormHelper.js";
    import {browser} from "$app/env";
    import {goto} from "$app/navigation";
    import BookingLayout from "./_components/BookingLayout.svelte";
    import {bookingStore} from "../../lib/stores.js";

    let form_errors = {};
    let loading = false;

    async function onSubmit(formData) {
        loading = true;
        $bookingStore.set("choices", formData);
        await goto('/book/service');
    }

    let disabled = true;

    function checkDisabled() {
        if (browser) {
            const form = document.getElementById("login-form");
            const formData = FormHelper.getFormData(form);
            const phone = formData.phone.replaceAll("_", "").replace("+1", "").replace("(", "").replace(")", "").replace("-", "").replace(/\s+/g, '');

            disabled = !formData?.name?.length || !formData?.email?.length || phone.length !== 9
        }
    }
</script>

<BookingLayout title="Hi there!" tip="Let's get started with some basic information about yourself.">
    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>

        <InputField form_errors={form_errors} name="name" type="text" label="Full Name *" icon={iconPerson}
                    required disablePrefill onChange={checkDisabled}/>
        <InputField form_errors={form_errors} name="email" type="email" label="Email *" icon={iconMail}
                    required disablePrefill onChange={checkDisabled}/>
        <InputField label="Phone *" type="tel" name="phone" icon={iconPhone} required alwaysShowMask
                    disablePrefill
                    mask='+1 (000) 000 - 0000'
                    size={20}
                    showMask
                    maskChar="_"
                    onChange={checkDisabled}
        />
        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled} {loading}>Continue</Button>
        <!--                <Separator label="Or continue with" height="1rem" />-->
        <!--                -->
        <!--                <div class="oauth-container">-->
        <!--                    <Button style="min-height: 48px;margin-top: 2rem;" disabled>Continue</Button>-->
        <!--                </div>-->
    </Form>
</BookingLayout>



