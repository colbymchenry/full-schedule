<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Form from '$lib/forms/form.svelte';
    import Button from '$lib/forms/button.svelte'
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import LoginLayout from "$lib/__layout/login-layout.svelte";
    import Swal from "sweetalert2";
    import AnimateCheckmark from "$lib/AnimateCheckmark.svelte";

    let response;
    let form_errors = {};

    async function onSubmit(data) {
        Swal.fire({
            icon: "success"
        })
        try {
            response = await FirebaseClient.sendPasswordResetEmail(data["email"]);
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
    <title>FS • Forgot Password</title>
</svelte:head>

<LoginLayout title="Forgot password?">
    <div slot="hint">
        Fill the form to reset your password
    </div>
    <div slot="form">

        <AnimateCheckmark />


        <Form class="login-form" onSubmit={onSubmit} hideFooter>
            <InputField form_errors={form_errors} name="email" type="email" label="Email address *" required/>
            <Button style="min-height: 48px;">Send reset link</Button>
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
