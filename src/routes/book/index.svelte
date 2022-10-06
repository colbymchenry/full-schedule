<script>
    import {iconLogo, iconMail, iconPerson, iconPhone} from "$lib/icons.js";
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import {FormHelper} from "../../utils/FormHelper.js";
    import {browser} from "$app/env";
    import {goto} from "$app/navigation";
    import BookingLayout from "./_components/BookingLayout.svelte";
    import {bookingStore, recaptchaKey} from "../../lib/stores.js";
    import {Api} from "../../utils/Api.js";

    let form_errors = {};
    let loading = false;

    async function onSubmit(formData) {
        loading = true;

        // If not in dev environment we need to use recaptcha
        // if (import.meta.env.VITE_ENV !== "DEV") {
        //     window.grecaptcha.ready(function () {
        //         window.grecaptcha.execute($recaptchaKey, {action: 'submit'}).then(async (token) => {
        //             try {
        //                 await Api.post('/api/lead', formData, {token})
        //                 $bookingStore.set("choices", formData);
        //                 $bookingStore.set("token", token)
        //                 await goto('/book/service');
        //             } catch (error) {
        //                 console.error(error);
        //             }
        //         }).catch((error) => {
        //             alert("Recaptcha failed.")
        //         });
        //     });
        // } else {
            try {
                if (localStorage.getItem("lead")) formData["original_lead"] = localStorage.getItem("lead");
                const res = await Api.post('/api/lead', formData, { token: "nil" });
                formData["lead"] = res.lead;
                localStorage.setItem("lead", res.lead);
                $bookingStore.set("choices", formData);
                await goto('/book/service');
            } catch (error) {
                console.error(error);
            }
        // }
        loading = false;
    }

    let disabled = true;

    function checkDisabled() {
        if (browser) {
            setTimeout(() => {
                const form = document.getElementById("login-form");
                const formData = FormHelper.getFormData(form);
                const phone = formData.phoneNumber.replaceAll("_", "").replace("+1", "").replace("(", "").replace(")", "").replace("-", "").replace(/\s+/g, '');
                disabled = !formData?.displayName?.length || !formData?.email?.length || phone.length !== 10
            }, 200);

        }
    }
</script>

<BookingLayout title="Hi there!" tip="Let's get started with some basic information about yourself.">
    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>

        <InputField form_errors={form_errors} name="displayName" type="text" label="Full Name *" icon={iconPerson}
                    required onChange={checkDisabled}/>
        <InputField form_errors={form_errors} name="email" type="email" label="Email *" icon={iconMail}
                    required onChange={checkDisabled}/>
        <InputField label="Phone *" type="tel" name="phoneNumber" icon={iconPhone} required onChange={checkDisabled}
        />
        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled} {loading}>Continue</Button>
        <!--                <Separator label="Or continue with" height="1rem" />-->
        <!--                -->
        <!--                <div class="oauth-container">-->
        <!--                    <Button style="min-height: 48px;margin-top: 2rem;" disabled>Continue</Button>-->
        <!--                </div>-->
    </Form>
</BookingLayout>



