<script>
    import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
    import BookingLayout from "../_components/BookingLayout.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";
    import {CalendarStyles} from "../../../utils/CalendarStyles.js";

    let disabled = true;
    let selectedDate = new Date();

    async function onSubmit(formData) {

    }
</script>



<BookingLayout title="Date & Provider" tip="Please select your preferred date and provider.">

    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>
        <DatePicker styling={CalendarStyles.appointments()} format='MM / DD / YYYY' continueText={"Select"} bind:selected={selectedDate}></DatePicker>
        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled}>Continue</Button>
    </Form>

</BookingLayout>

