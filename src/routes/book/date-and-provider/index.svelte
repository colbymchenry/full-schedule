<script>
    import BookingLayout from "../_components/BookingLayout.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";
    import InputField from '$lib/forms/input-field.svelte';
    import {iconCalendar} from "../../../lib/icons.js";
    import {bookingStore} from "../../../lib/stores.js";

    let disabled = true;
    let selectedDate = new Date();

    $: availability = new Promise(fetchAvailability);

    async function fetchAvailability() {
        console.log($bookingStore)
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

