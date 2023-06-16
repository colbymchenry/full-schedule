<script>
  import InputField from '$lib/forms/input-field.svelte';
  import Select from '$lib/forms/select.svelte';
  import Form from '$lib/forms/form.svelte';
  import Section from '$lib/forms/section.svelte';
  import Row from '$lib/forms/row.svelte';
  import Separator from '$lib/forms/separator.svelte';
  import Avatar from '$lib/avatar.svelte';
  import { FirebaseClient } from '../../../utils/firebase/FirebaseClient.js';
  import { showToast } from '../../../utils/logger.js';
  import states from '../../../assets/states.json';
  import timezones from '../../../assets/timezones.json';
  import {
    iconCity,
    iconClock,
    iconFacebook,
    iconInstagram,
    iconMap,
    iconPhone,
    iconRoadSign,
    iconState,
    iconStore,
    iconTiktok,
    iconTwitter,
    iconYoutube
  } from '../../../lib/icons.js';
  import { auth, settings } from '../../../lib/stores.js';
  import { ApiProgressBar } from '../../../utils/ApiProgressBar.js';
  import { JsonHelper } from '../../../utils/JsonHelper.js';
  import { Api } from '../../../utils/Api.js';

  let form_errors = {};
  let storeLogo;

  async function onSubmit(formData) {
    ApiProgressBar.start();

    delete formData['image'];

    let jsonHelper = new JsonHelper(formData);
    try {
      // If there is a new store logo we need to upload it to Cloud.
      if (storeLogo) {
        // Upload image to Cloud Storage
        jsonHelper.set('store.logo', await FirebaseClient.uploadFile(storeLogo, 'logo'));
      } else if ($settings?.object?.store?.logo) {
        jsonHelper.set('store.logo', $settings?.object?.store?.logo);
      }

      await FirebaseClient.update('settings', 'main', jsonHelper.object);

      if (jsonHelper?.object?.address?.timezone) {
        await Api.patch('/api/google-calendar', {
          timeZone: jsonHelper?.object?.address?.timezone
        });
      }
    } catch (e) {
      showToast();
      console.error(e);
    }

    ApiProgressBar.stop();
  }
</script>

<Form {onSubmit}>
  <Section
    title="Logo"
    info="Your store logo is used in the booking process, dashboard, invoices, and more!"
  >
    <Avatar
      src={$settings?.object?.store?.logo}
      size="large"
      dontUpload
      onChange={(imgData) => (storeLogo = imgData)}
      canEdit={$auth?.email === 'me@colbymchenry.com'}
      square
    />
  </Section>

  <Section
    title="Name & Phone Number"
    info="Following information is publicly displayed, be careful!"
  >
    <Row>
      <InputField
        label="Name"
        name="store.name"
        icon={iconStore}
        value={$settings.get('store.name')}
      />
      <InputField
        label="Phone"
        type="tel"
        name="store.phone"
        icon={iconPhone}
        value={$settings.get('store.phone')}
        alwaysShowMask
        mask="+1 (000) 000 - 0000"
        size={20}
        showMask
        maskChar="_"
      />
    </Row>
  </Section>

  <Separator />

  <Section
    title="Address & Timezone"
    info="This will be used in emails, SMS messages, and booking process."
  >
    <Row>
      <InputField
        label="Street Address (Line 1)"
        name="address.street1"
        icon={iconRoadSign}
        value={$settings.get('address.street1')}
        disablePrefill
      />
      <InputField
        label="Street Address (Line 2)"
        name="address.street2"
        icon={iconRoadSign}
        value={$settings.get('address.street2')}
        disablePrefill
      />
      <Select
        label="State"
        name="address.state"
        icon={iconState}
        value={$settings.get('address.state')}
      >
        {#each states as state}
          <option value={state.value}>{state.label}</option>
        {/each}
      </Select>
      <InputField
        label="City"
        name="address.city"
        icon={iconCity}
        value={$settings.get('address.city')}
        disablePrefill
      />
      <InputField
        label="Zip"
        name="address.zip"
        icon={iconMap}
        value={$settings.get('address.zip')}
        disablePrefill
      />
      <Select
        label="Timezone"
        name="address.timezone"
        icon={iconClock}
        value={$settings.get('address.timezone')}
      >
        {#each timezones.sort((a, b) => a.label.localeCompare(b.label)) as timezone}
          <option value={timezone.value}>{timezone.label}</option>
        {/each}
      </Select>
    </Row>
  </Section>

  <Separator />

  <Section title="Socials" info="This will be used in emails, SMS messages, and booking process.">
    <Row>
      <InputField
        label="TikTok"
        name="socials.tiktok"
        icon={iconTiktok}
        value={$settings.get('socials.tiktok')}
        placeholder="Enter account name"
        disablePrefill
      />
      <InputField
        label="Instagram"
        name="socials.instagram"
        icon={iconInstagram}
        value={$settings.get('socials.instagram')}
        placeholder="Enter account name"
        disablePrefill
      />
      <InputField
        label="Facebook"
        name="socials.facebook"
        icon={iconFacebook}
        value={$settings.get('socials.facebook')}
        placeholder="Enter account name"
        disablePrefill
      />
      <InputField
        label="YouTube"
        name="socials.youtube"
        icon={iconYoutube}
        value={$settings.get('socials.youtube')}
        placeholder="Enter account name"
        disablePrefill
      />
      <InputField
        label="Twitter"
        name="socials.twitter"
        icon={iconTwitter}
        value={$settings.get('socials.twitter')}
        placeholder="Enter account name"
        disablePrefill
      />
    </Row>
  </Section>
</Form>
