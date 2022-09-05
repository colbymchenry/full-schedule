<script>
    import {iconLogo, iconMail, iconPerson, iconPhone} from "../lib/icons.js";
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import {getContext} from "svelte";
    import {FormHelper} from "../utils/FormHelper.js";
    import {browser} from "$app/env";

    let form_errors = {};
    let booking_setup = getContext("booking_setup");

    async function onSubmit(formData) {

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

<div class="container">
    <div>
        <div class="logo-container">
            {#if booking_setup?.store?.logo}
                <img src={booking_setup.store.logo} alt="Logo" loading="eager"/>
            {:else}
                {@html iconLogo}
            {/if}
        </div>
        <h1>Hi there!</h1>
        <div class="signup-container">
            Please provide us with some basic information so we can get started.
        </div>
        <div class="form-container">
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
                <Button style="min-height: 48px;margin-top: 2rem;" {disabled}>Continue</Button>
                <!--                <Separator label="Or continue with" height="1rem" />-->
                <!--                -->
                <!--                <div class="oauth-container">-->
                <!--                    <Button style="min-height: 48px;margin-top: 2rem;" disabled>Continue</Button>-->
                <!--                </div>-->
            </Form>
        </div>
    </div>
</div>

<style lang="scss">

  @media screen and (max-width: 600px) {
    .container {
      width: 100% !important;
      height: 100% !important;
      background: transparent !important;
      padding: 10vw !important;

      > div:first-of-type {
        min-width: auto !important;
      }
    }
  }

  .container {
    margin: auto;
    padding: 3rem;
    border-radius: 1rem;
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    width: auto;
    display: grid;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 16px;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    background-color: #fff;


    > div:first-of-type {
      position: relative;
      display: grid;
      min-width: 450px;
      grid-auto-columns: 1fr;
      grid-auto-rows: auto;
      grid-column-gap: 16px;
      grid-row-gap: 16px;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }


    h1:first-of-type {
      font-weight: 800;
      letter-spacing: 0;
      font-size: 38px;
      line-height: 44px;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .logo-container {
      margin-left: 28%;
      transform: scale(1.8);

      img {
        width: 3rem;
        max-width: 3rem;
        min-width: 3rem;
      }
    }

    .signup-container {
      margin-top: -4%;
      font-size: 14px;
    }

    * :global(.login-form) {
      display: flex;
      flex-direction: column;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      padding: 2rem 0;
    }

    .form-container {
      margin: 0 0 15px;
    }
  }
</style>
