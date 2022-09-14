<script>
    import BookingLayout from "../_components/BookingLayout.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";
    import InputField from '$lib/forms/input-field.svelte';
    import {iconCalendar} from "../../../lib/icons.js";
    import {bookingStore} from "../../../lib/stores.js";
    import {Api} from "../../../utils/Api.js";
    import {browser} from "$app/env";

    let disabled = true;
    let selectedDate = new Date();

    let availability = new Promise(fetchAvailability);

    async function fetchAvailability() {
        if (browser) {
            try {
                availability = await Api.post(`/api/fetch-availability`, {
                    services: $bookingStore.get("services").map(({doc_id}) => doc_id),
                    date: selectedDate
                });

                console.log(availability);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function onSubmit(formData) {

    }
</script>


<BookingLayout title="Date & Provider" tip="Please select your preferred date and provider.">

    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>

        <div class="container">
            <div style="justify-self: flex-start;">
                <label>Date:</label>
                <InputField type="date" icon={iconCalendar} bind:value={selectedDate} dateProps={{
                    closeOnSelection: true
                }}/>
            </div>


        </div>

        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled}>Continue</Button>
    </Form>

</BookingLayout>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    min-height: 300px;

    label {
      font-weight: 500;
      line-height: 2rem;
    }
  }
</style>

