<script>
    import {
        iconBirthday, iconCalendar,
        iconClose,
        iconMail,
        iconNotes,
        iconPhone,
        iconPin
    } from "../../../../lib/icons.js";
    import Button from "$lib/forms/button.svelte";
    import Checkbox from "$lib/forms/checkbox.svelte";
    import InputField from "$lib/forms/input-field.svelte";
    import InputSelect from "$lib/forms/select.svelte";
    import Avatar from "$lib/avatar.svelte";
    import {settings} from "../../../../lib/stores.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {browser} from "$app/env";
    import {Api} from "../../../../utils/Api.js";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";

    export let appointment, fetchAppointments, staffAccounts, services, visible;

    let availability = new Promise(fetchAvailability);
    let client = appointment.userInfo;
    let closing = false;
    let notifyCustomer = false;

    let submitted = false;
    let selectedServices = appointment.services;
    let selectedDate = FirebaseClient.toDate(appointment.start);
    let selectedTime = FirebaseClient.toDate(appointment.start);

    async function updateAppointment() {
        submitted = true;

        try {
            let res = await Api.patch(`/api/appointment`, {
                services: selectedServices,
                date: selectedDate,
                timestamp: selectedTime,
                notify: notifyCustomer,
                appointment
            });

            await fetchAppointments();
            alert("Appointment updated!")
            close();
        } catch (error) {
            console.error(error);
        }

        submitted = false;
    }

    async function deleteAppointment() {

    }

    function close() {
        if (closing) return;

        closing = true;
        setTimeout(() => {
            visible = false;
        }, 400);
    }

    async function fetchAvailability() {
        if (browser) {
            try {
                let res = await Api.post(`/api/fetch-availability`, {
                    services: selectedServices,
                    date: selectedDate
                });

                availability = Object.values(res.timeSlots).find((d) => d.uid === appointment.staff);

                if (!availability.availability[0].includes("T")) {
                    selectedTime = availability.availability[0];
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    // This seems weird, but we run fetchAvailability any time the selected date changes.
    $: selectedDate, fetchAvailability();

    function handleNextAvailability(e) {
        if (e.target.value === "goto") {
            selectedDate = new Date(availability.availability[0]);
        } else if (e.target.value.includes(":")) {
            selectedTime = e.target.value;
        }
    }

    function handleServiceChange(e) {
        if (e.target.checked) {
            selectedServices = [...selectedServices, e.target.value];
        } else {
            const index = selectedServices.indexOf(e.target.value);
            if (index > -1) { // only splice array when item is found
                selectedServices.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        availability = new Promise(fetchAvailability);
    }
</script>

<div class="overlay" class:closing={closing}>
    <div class="container">
        <div class="content">
            <div class="title">
                <h1>Edit Appointment</h1>
                <Button icon={iconClose} color="icon" callback={close}/>
            </div>

            <div class="app">
                <div class="client">
                    <input type="hidden" value={client.doc_id} name="client"/>
                    <div class="client-info">
                        <div class="name">
                            <div>
                                <Avatar user={client} size="small"/>
                                <h3>{client?.displayName?.toLowerCase() || "No Name"}</h3>
                            </div>
                        </div>

                        <section class="content">
                            <div class="icon">
                                {@html iconMail}
                            </div>
                            <div class="info">
                                <a href={`mailto:${client?.email}`}>{client?.email}</a>
                            </div>
                            {#if client?.phoneNumber}
                                <div class="icon">
                                    {@html iconPhone}
                                </div>
                                <div class="info">
                                    <a href={`tel:${client.phoneNumber}`}
                                       class="font-mono">{client.phoneNumber.replace(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, '+1 $1 $2 $3')}</a>
                                </div>
                            {/if}
                            {#if client?.address}
                                <div class="icon">
                                    {@html iconPin}
                                </div>
                                <div class="info">
                                    {client.address}
                                </div>
                            {/if}
                            {#if client?.birthday}
                                <div class="icon">
                                    {@html iconBirthday}
                                </div>
                                <div class="info">
                                    {new Date(client.birthday).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        ...($settings.get("address.timezone") && {timeZone: $settings.get("address.timezone")})
                                    })}
                                </div>
                            {/if}
                            {#if client?.notes}
                                <div class="icon">
                                    {@html iconNotes}
                                </div>
                                <div class="info">
                                    {@html client.notes}
                                </div>
                            {/if}
                        </section>
                    </div>
                </div>
                <!-- Right Side -->
                <div class="right">
                    <div class="time-and-date">
                        <div>
                            <label>Date:</label>
                            <InputField type="date" icon={iconCalendar} name="date" bind:value={selectedDate} dateProps={{
                                closeOnSelection: true,
                                min: new Date()
                            }}/>
                        </div>
                        <div>
                            <label>Time: </label>
                            <InputSelect hideDefault onChange={handleNextAvailability}>
                                {#await availability}
                                    <option disabled>Fetching...</option>
                                {:then data}
                                    {#if data.availability[0].includes("T")}
                                        <option>No availability</option>
                                        <option value={"goto"}>Go
                                            to: {new Date(data.availability[0]).toDateString()}</option>
                                    {:else}
                                        {#each data.availability as timeSlot}
                                            <option value={timeSlot}>{TimeHelper.convertTime24to12(timeSlot)}</option>
                                        {/each}
                                    {/if}
                                {:catch error}

                                {/await}

                            </InputSelect>
                        </div>
                    </div>
                    <div class="services-container">
                        <div>Services</div>
                        <div>
                            {#await services}
                                <p>Fetching services...</p>
                            {:then data}
                                {#each data as service}
                                    <Checkbox name="services" value={service.doc_id} onChange={handleServiceChange}
                                              checked={selectedServices.includes(service.doc_id)}>{service.name}</Checkbox>
                                {/each}
                            {:catch error}
                                <p>Error fetching services...</p>
                            {/await}
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="footer">
            <div>
                <Checkbox name="notify_customer" onChange={(e) => notifyCustomer = e.target.checked} checked={notifyCustomer}>Notify customer?
                </Checkbox>
            </div>
            <div>
                <Button color="delete">Delete</Button>
                <Button type="button" loading={submitted} callback={updateAppointment}>Save</Button>
            </div>
        </div>
    </div>
</div>


<style lang="scss">
  .right {
    display: flex;
    flex-direction: column;

    .time-and-date {
      flex-shrink: 1;
      display: flex;
      margin-bottom: 1rem;
      align-items: stretch;

      & > div:first-of-type {
        margin-right: 1rem;
      }
    }

    .services-container {
      flex-grow: 1;
    }
  }

  .services-container {
    border: 1px solid var(--border-color);
    min-height: 21rem;
    max-height: 21rem;
    overflow-y: auto;

    > div:first-of-type {
      background-color: rgb(248 250 252 / 1);
      color: var(--secondary-color);
      border-bottom: 1px solid var(--border-color);
      padding: 0 1rem;
      height: 2rem;
      display: flex;
      align-items: center;
    }

    > div:last-of-type {
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 2rem;
      row-gap: 0.5rem;
      overflow-y: auto;
      align-items: flex-start;
    }
  }

  .overlay.closing {
    animation: fadeOut 0.4s ease forwards !important;

    .container {
      animation: fadeScaleOut 0.4s ease forwards;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.32);
    z-index: 10;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    opacity: 0;
    animation: fadeIn 0.4s ease forwards;
  }

  .container {
    min-width: 500px;
    min-height: 200px;
    background-color: white;
    z-index: 11;
    border-radius: 1rem;
    box-shadow: 0 11px 15px -7px #0003, 0 24px 38px 3px #00000024, 0 9px 46px 8px #0000001f;
    animation: fadeScaleIn 0.4s ease forwards;
    display: flex;
    flex-direction: column;

    .footer {
      background-color: #f8fafc;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    .content {
      padding: 2rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
          font-weight: 500;
          line-height: 1.5rem;
          font-size: 1.125rem;
        }
      }

      .app {
        display: flex;
        align-items: flex-start;

        > div {
          flex: 1;
        }
      }
    }
  }

  .client-info {
    margin-top: 1rem;
    overflow-y: auto;
    min-height: 19rem;
    max-height: 19rem;
    margin-right: 2rem;

    .name {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;

        h3 {
          text-transform: capitalize;
          font-weight: 700;
          font-size: 1.25rem;
          margin-left: 1rem;
        }
      }
    }

    .content {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 48px auto;
      align-items: flex-start;
      padding: 0 0.5rem;
      border-top: 2px solid var(--border-color);
      margin-top: 1rem;

      .icon {
        color: #63738a;
        transform: scale(0.5);
        margin-left: -1rem;
      }

      .info {
        line-height: 1.5rem;
        font-size: 14px;
        margin-top: 0.8rem;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeScaleIn {
    from {
      opacity: 0;
      transform: scale(0.7);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadeScaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.7);
    }
  }
</style>