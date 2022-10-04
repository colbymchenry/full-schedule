<script>
    import {
        iconBirthday, iconCalendar,
        iconMail,
        iconNotes,
        iconPhone,
        iconPin
    } from "../../../../lib/icons.js";
    import Popup from "$lib/popup.svelte";
    import Button from "$lib/forms/button.svelte";
    import Checkbox from "$lib/forms/checkbox.svelte";
    import InputField from "$lib/forms/input-field.svelte";
    import InputSelect from "$lib/forms/select.svelte";
    import Avatar from "$lib/avatar.svelte";
    import {settings} from "../../../../lib/stores.js";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";

    export let staff, date, fetchStaff, staffAccounts, visible, onClose;

    let closing = false;
    let submitted = false;


    function close() {
        if (closing) return;

        closing = true;
        setTimeout(() => {
            visible = false;
        }, 400);
    }

    async function blockTime() {

    }
</script>

<Popup {onClose} bind:visible={visible} bind:closing={closing} title="Block Time">
    <div slot="content" class="app">
        <h1>BLOCK TIME</h1>
    </div>

    <svelte:fragment slot="footer">
        <div>

        </div>
        <div>
            <Button type="button" loading={submitted} callback={blockTime}>Submit</Button>
        </div>
    </svelte:fragment>
</Popup>

<style lang="scss">
  .app {
    display: flex;
    align-items: flex-start;

    > div {
      flex: 1;
    }
  }
</style>