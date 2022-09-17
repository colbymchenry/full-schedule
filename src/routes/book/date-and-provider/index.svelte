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
    let minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);

    let availability = new Promise(fetchAvailability);
    let selectedTimeSlot;

    function selectTimeslot(staff, timestamp) {
        selectedTimeSlot = {
            staff: staff.doc_id,
            timestamp
        }

        console.log(selectedTimeSlot)
    }

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

    console.log(selectedTimeSlot)
</script>


<BookingLayout title="Date & Provider" tip="Please select your preferred date and provider.">

    <Form id="login-form" class="login-form" onSubmit={onSubmit} hideFooter>

        <div class="container">
            <div style="justify-self: flex-start;">
                <label>Date:</label>
                <InputField type="date" icon={iconCalendar} bind:value={selectedDate} dateProps={{
                    closeOnSelection: true,
                    min: minDate
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
                                {#if staff.availability.length > 1 && typeof staff.availability[0] !== 'date'}
                                    {#each staff.availability as timestamp}
                                        <button type="button" class="time-slot"
                                                class:selected={selectedTimeSlot
                                                    && selectedTimeSlot["staff"] === staff.doc_id
                                                    && selectedTimeSlot["timestamp"] === timestamp
                                                }
                                                on:click={() => selectTimeslot(staff, timestamp)}>
                                            {TimeHelper.convertTime24to12(timestamp)}
                                        </button>
                                    {/each}
                                {:else}
                                    <small>Next availability:
                                        <button type="button"
                                                on:click={() => selectedDate = new Date(staff.availability[0])}>
                                            {new Date(staff.availability[0]).toDateString()}
                                        </button>
                                    </small>
                                {/if}
                            </div>
                        </div>
                    {/each}
                {:catch error}

                {/await}
            </div>
        </div>

        <Button style="min-height: 48px;margin-top: 2rem;justify-self: stretch;" disabled={!selectedTimeSlot}>Continue</Button>
    </Form>

</BookingLayout>

<style lang="scss">
  .staff__container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: 30vh;
    margin-top: 2rem;
    overflow: auto;

    .staff__block {
      display: flex;
      flex-direction: column;
      margin: 0.5rem 0;

      small {
        font-weight: 500;

        > button {
          border: none;
          outline: none;
          font-weight: 600;
          color: var(--primary-color);
          background: none;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .staff__info {
        display: flex;
        align-items: center;

        > div {
          display: flex;
          flex-direction: column;
          margin-left: 1rem;

          span {
            text-transform: capitalize;
          }

          > span:first-of-type {
            font-weight: 500;
          }

          > span:last-of-type {
            font-size: 0.6875rem;
            color: var(--fuse-text-hint);
            margin-top: 0.25rem;
          }
        }
      }

      .staff__time-slots {
        display: flex;
        overflow-y: hidden;
        overflow-x: auto;
        margin-top: 0.5rem;
        max-width: 100%;
        padding-bottom: 0.25rem;

        .time-slot {
          white-space: nowrap;
          outline: none;
          border: none;
          margin: 0 0.25rem;
          border-radius: 9999px;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          cursor: pointer;
          color: var(--fuse-accent-400);
          background-color: var(--fuse-accent-200) !important;

          &.selected {
            background-color: var(--primary-color) !important;
            color: white !important;
          }

          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 300px;
    max-width: 100%;
    overflow: hidden;

    label {
      font-weight: 500;
      line-height: 2rem;
    }
  }
</style>

