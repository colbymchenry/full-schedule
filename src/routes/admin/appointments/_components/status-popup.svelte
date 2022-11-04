<script>
    import Popup from "$lib/popup.svelte";
    import InputField from "$lib/forms/input-field.svelte";
    import Button from "$lib/forms/button.svelte";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../../../utils/logger.js";
    let closing = false;
    export let visible;
    export let checkingIn;
    export let appointment;
    export let fetchAppointments;

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();

    function close() {
        if (closing) return;

        closing = true;
        setTimeout(() => {
            visible = false;
        }, 400);
    }

    async function submitTime() {
        try {
            await FirebaseClient.update("appointments", appointment.doc_id, {
            ...(checkingIn && { checkIn: time }),
            ...(!checkingIn && { checkOut: time })
            });

            await fetchAppointments();
            close();
        } catch (error) {
            console.error(error);
            showToast()
        }
    }
</script>

<Popup bind:visible={visible} bind:closing={closing} title={checkingIn ? "Check In" : "Check Out"}>
    <div slot="content">
        <InputField type="time" bind:value={time} />
        <Button type="button" callback={submitTime} style="margin-left: 1rem;">Check {checkingIn ? "In": "Out"}</Button>
    </div>
</Popup>

<style lang="scss">
    div {
      display: flex;
      align-items: center;
    }
</style>