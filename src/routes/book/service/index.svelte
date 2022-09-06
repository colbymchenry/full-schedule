<script context="module">
    export async function load({url, params}) {
        const res = await fetch(`${url.origin}/api/booking-setup?services=true`);
        const data = await res.json();
        return {props: {services: data}}
    }
</script>

<script>
    // have to import FirebaseClient to init analytics
    import {bookingStore} from "$lib/stores.js";
    import Checkbox from "$lib/forms/checkbox.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";
    import BookingLayout from "../_components/BookingLayout.svelte";
    import {browser} from "$app/env";
    import {FormHelper} from "../../../utils/FormHelper.js";
    import {goto} from "$app/navigation";

    export let services;

    if (services && $bookingStore) {
        $bookingStore.set("services", services);
    }

    async function onSubmit(formData) {
        let choices = $bookingStore.get("choices");
        choices["services"] = Object.keys(formData);
        $bookingStore.set("choices", choices);
        await goto('/book/date-and-provider');
    }

    let disabled = true;

    function checkDisabled() {
        if (browser) {
            const form = document.getElementById("login-form");
            const formData = FormHelper.getFormData(form);
            disabled = !Object.keys(formData).length;
        }
    }
</script>

<BookingLayout title="Services" tip="Please select the services you're interested in.">

    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>
        <div class="container">
            {#each $bookingStore.get("services") as service}
                <div>
                    <Checkbox name={service.doc_id} onChange={checkDisabled}>{service.name}</Checkbox>
                </div>
            {/each}
        </div>

        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled}>Continue</Button>
    </Form>

</BookingLayout>

<style lang="scss">
  .container {
    max-height: 20rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr;
    border-radius: 0.5rem;

    > div {
      border-top: 1px solid var(--border-color);
      padding: 0.5rem 0;
    }

    > div:first-of-type {
      border-top: none !important;
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      border: 1px solid var(--border-color);

      > div {
        padding: 0.5rem 0.5rem;
      }
    }
  }
</style>