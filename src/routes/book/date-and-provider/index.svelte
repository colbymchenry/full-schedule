<script>
    import BookingLayout from "../_components/BookingLayout.svelte";
    import Form from "$lib/forms/form.svelte";
    import Button from "$lib/forms/button.svelte";
    import InputField from '$lib/forms/input-field.svelte';
    import Avatar from '$lib/avatar.svelte';
    import {iconCalendar} from "../../../lib/icons.js";
    import {bookingStore} from "../../../lib/stores.js";
    import {Api} from "../../../utils/Api.js";
    import {browser} from "$app/env";
    import {TimeHelper} from "../../../utils/TimeHelper.js";

    let disabled = true;
    let selectedDate = new Date();

    let availability = new Promise(fetchAvailability);

    async function fetchAvailability() {
        if (browser) {
            try {
                let res = await Api.post(`/api/fetch-availability`, {
                    services: $bookingStore.get("services").map(({doc_id}) => doc_id),
                    date: selectedDate
                });

                availability = Object.values(res.timeSlots);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // This seems weird, but we run fetchAvailability any time the selected date changes.
    $: selectedDate, fetchAvailability();

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

            <div class="staff__container">
                {#await availability}
                    <p>Contacting server...</p>
                {:then data}
                    {#each availability as staff}
                        <div class="staff__block">
                            <div class="staff__info">
                                <Avatar user={staff} size="small"/>
                                <div>
                                    <span>{staff.displayName}</span>
                                    <span>{staff.title}</span>
                                </div>
                            </div>
                            <div class="staff__time-slots">
                                {#each staff.availability as timestamp}
                                    <button type="button">{TimeHelper.convertTime24to12(timestamp)}</button>
                                {/each}
                            </div>
                        </div>
                    {/each}
                {:catch error}

                {/await}
            </div>
        </div>

        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" {disabled}>Continue</Button>
    </Form>

</BookingLayout>

<style lang="scss">
  .staff__container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;

    .staff__block {
      display: flex;
      flex-direction: column;

      .staff__info {
        display: flex;
        align-items: center;

        > div {
          display: flex;
          flex-direction: column;
          margin-left: 1rem;
        }
      }

      .staff__time-slots {
        display: flex;
        overflow-y: hidden;
        overflow-x: auto;
        margin-top: 0.5rem;
        max-width: 100%;

        button {
          white-space: nowrap;
        }
      }
    }
  }

  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    min-height: 300px;
    max-width: 100%;
    overflow: hidden;

    label {
      font-weight: 500;
      line-height: 2rem;
    }
  }
</style>

