<script>
    import BookingLayout from "../_components/BookingLayout.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";

    let disabled = true;
    let selectedDate = new Date();

    async function onSubmit(formData) {

    }
</script>



<BookingLayout title="Date & Provider" tip="Please select your preferred date and provider.">

    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>
        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled}>Continue</Button>
    </Form>

</BookingLayout>

