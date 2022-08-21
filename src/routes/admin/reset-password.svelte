<script>
    import InputField from '$lib/forms/input-field.svelte';
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
    <title>FS • Reset Password</title>
</svelte:head>

<LoginLayout title="Reset your password">
    <div slot="hint">
        Create a new password for your account
    </div>
    <div slot="form">
        <Form class="login-form" onSubmit={onSubmit} hideFooter>
            <InputField form_errors={form_errors} name="password" type="password" label="Password *" required/>
            <InputField form_errors={form_errors} name="password_confirm" type="password" label="Password (Confirm) *" required/>
            <Button style="min-height: 48px;">Reset your password</Button>
        </Form>

        <span>Return to <a href="/admin">sign in</a></span>
    </div>
</LoginLayout>


<style lang="scss">
  span {
    color: var(--fuse-text-secondary);
    font-size: 13px;
    font-weight: 500;

    a {
      font-weight: 500;
    }
  }
</style>
