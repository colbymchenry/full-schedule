<script>
  import InputField from '$lib/forms/input-field.svelte';
  import Form from '$lib/forms/form.svelte';
  import Section from '$lib/forms/section.svelte';
  import { FirebaseClient } from '../../../utils/firebase/FirebaseClient.js';
  import { auth } from '../../../lib/stores.js';
  import { showToast } from '../../../utils/logger.js';
  import { iconKey } from '../../../lib/icons.js';
  import { Api } from '../../../utils/Api.js';
  import { ApiProgressBar } from '../../../utils/ApiProgressBar.js';

  let form_errors = {};

  async function onSubmit(data) {
    if (data['password'].length < 8) {
      form_errors['password'] = 'Your new password must be at least 8 characters long.';
      form_errors = form_errors;
      return;
    }

    if (data['password'].length > 15) {
      form_errors['password'] = 'Your new password must be less than 16 characters long.';
      form_errors = form_errors;
      return;
    }

    if (!data['password'].match(FirebaseClient.passwordRegex)) {
      form_errors['password'] =
        'Your new password must include numbers, letters and special characters.';
      form_errors = form_errors;
      return;
    }

    ApiProgressBar.start();
    try {
      try {
        if ($auth?.email === import.meta.env.VITE_EMAIL) {
          await FirebaseClient.signIn($auth.email, data['old_password']);

          await Api.patch('/api/user', {
            uid: $auth.uid,
            password: data.password
          });
        }
      } catch (error) {
        if (error?.code === 'auth/wrong-password') {
          form_errors['old_password'] = 'Wrong password.';
        }

        form_errors = form_errors;
      }
    } catch (error) {
      showToast(error?.message);
    }
    ApiProgressBar.stop();
  }
</script>

<Form {onSubmit}>
  <Section title="Change your password" info="Pro tip: Never share your password.">
    <InputField
      label="Current password *"
      type="password"
      name="old_password"
      icon={iconKey}
      required
      bind:form_errors
    />
    <InputField
      label="New password *"
      type="password"
      name="password"
      icon={iconKey}
      required
      bind:form_errors
      info="Minimum 8 characters. Must include numbers, letters and special characters."
    />
  </Section>
</Form>
