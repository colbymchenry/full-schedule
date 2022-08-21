<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Checkbox from '$lib/forms/checkbox.svelte';
    import Form from '$lib/forms/form.svelte';
    import Button from '$lib/forms/button.svelte'
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {goto} from "$app/navigation";
    import {authStore} from "../../lib/stores.js";
    import LoginLayout from "$lib/__layout/login-layout.svelte";

    let response;
    let form_errors = {};

    async function onSubmit(data) {
        try {
            response = await FirebaseClient.signIn(data["email"], data["password"]);
            $authStore = response.user;
            localStorage.setItem("user", JSON.stringify(response.user));
            await goto("/admin/clients");
        } catch (error) {
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

<LoginLayout title="Sign in">
    <div slot="hint">
        Don&#x27;t have an account? <a href="/admin/create-account">Sign up</a>
    </div>
    <div slot="form">
        <Form class="login-form" onSubmit={onSubmit} hideFooter>
            <InputField form_errors={form_errors} name="email" type="email" label="Email address *" required/>
            <InputField form_errors={form_errors} name="password" type="password" label="Password *"
                        required/>
            <div class="remember-container">
                <Checkbox name="remember" label="Remember me"/>
                <a href="/admin/forgot-password" style="justify-self: flex-end;">Forgot password?</a>
            </div>
            <Button>Sign in</Button>
        </Form>
    </div>
</LoginLayout>


<style lang="scss">
    .remember-container {
      display: grid;
      margin-top: 11px;
      grid-auto-columns: 1fr;
      grid-column-gap: 16px;
      grid-row-gap: 16px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
</style>
