<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Checkbox from '$lib/forms/checkbox.svelte';
    import Form from '$lib/forms/form.svelte';
    import Button from '$lib/forms/button.svelte'
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {goto} from "$app/navigation";
    import {iconLogo} from "../../lib/icons.js";
    import {authStore} from "../../lib/stores.js";

    let response;
    let form_errors = {};

    async function onSubmit(data) {
        try {
            response = await FirebaseClient.signIn(data["email"], data["password"]);
            $authStore = response.user;
            await goto("/admin/clients");
        } catch (error) {
            console.error(error)
            if (error?.code === 'auth/user-not-found') {
                form_errors['email'] = "User not found.";
            } else if (error?.code === 'auth/wrong-password') {
                form_errors['password'] = "Wrong password."
            }

            form_errors = form_errors;
        }
    }
</script>

<svelte:head>
    <title>FS • Admin Login</title>
</svelte:head>

<div class="container">
    <div>
        <div class="logo-container">
            {@html iconLogo}
        </div>
        <h1>Sign in</h1>
        <div class="signup-container">Don&#x27;t have an account? <a href="/admin/create-account">Sign up</a></div>
        <div class="form-container">
            <Form class="login-form" onSubmit={onSubmit}>
                <InputField form_errors={form_errors} name="email" type="email" label="Email address *" required/>
                <InputField form_errors={form_errors} name="password" type="password" label="Password *"
                            required/>
                <div>
                    <Checkbox name="remember" label="Remember me"/>
                    <a href="/admin/forgot-password" style="justify-self: flex-end;">Forgot password?</a>
                </div>
                <Button>Sign in</Button>
            </Form>
        </div>
    </div>
    <div>
        <div class="right-content">
            <h1>Welcome to<br>Full Schedule</h1>
            <div>
                Full Schedule
                helps business owners keep all of their operations under one platform by offering: scheduling, payment
                processing, client and staff management, marketing analytics, revenue reports, and more.
            </div>
        </div>
        <div class="right-graphic">
            <svg viewbox="0 0 960 540" width="100%" height="100%" preserveaspectratio="xMidYMax slice"
                 xmlns="http://www.w3.org/2000/svg">
                <g class="opacity-20 MuiBox-root muiltr-1wnrr1p" fill="none" stroke="currentColor" stroke-width="100">
                    <circle r="234" cx="196" cy="23"></circle>
                    <circle r="234" cx="790" cy="491"></circle>
                </g>
            </svg>
        </div>
        <div class="right-graphic is--dots">
            <svg viewbox="0 0 220 192" fill="none">
                <defs>
                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20"
                             patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
            </svg>
        </div>
    </div>
</div>

<style lang="scss">
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    overflow: hidden;
    width: 70%;
    height: 75%;
    max-height: 700px;
    max-width: 80rem;
    min-height: 500px;
    min-width: 50rem;
    justify-content: center;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 16px;
    grid-template-columns: auto 1.25fr;
    grid-template-rows: auto;
    border-radius: 20px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 43%);
    background-color: #fff;


    > div:first-of-type {
      justify-self: stretch;
      align-self: stretch;
      position: relative;
      display: grid;
      min-width: 450px;
      padding: 6.4rem 3.4rem;
      grid-auto-columns: 1fr;
      grid-auto-rows: auto;
      grid-column-gap: 16px;
      grid-row-gap: 16px;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }

    > div:last-of-type {
      justify-self: stretch;
      align-self: stretch;
      position: relative;
      display: flex;
      align-items: center;
      background-color: #1e293a;

      .right-content {
        position: relative;
        z-index: 2;
        display: grid;
        width: 80%;
        margin-left: 10%;
        grid-auto-columns: 1fr;
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        h1 {
          color: #f1f5f9;
          font-size: 48px;
          line-height: 55px;
          margin-top: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        div {
          color: #bdbdbd;
          font-weight: 500;
        }
      }

      .right-graphic {
        position: absolute;
        left: 0;
        top: 0;
        right: auto;
        bottom: auto;
        width: 100%;
        height: 100%;
        color: #2c384a;

        &.is--dots {
          left: auto;
          top: 0;
          right: 0;
          bottom: auto;
          width: 220px;
          height: 192px;
          margin-top: -3.8rem;
          margin-right: -4.9rem;
        }
      }
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
    }

    .signup-container {
      margin-top: -6%;
    }

    * :global(.login-form) {
      display: flex;
      flex-direction: column;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
    }

    .form-container {
      margin: 0 0 15px;

      form div {
        display: grid;
        margin-top: 11px;
        grid-auto-columns: 1fr;
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
      }
    }
  }
</style>
