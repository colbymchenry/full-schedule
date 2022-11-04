<script>
    import {TimeHelper} from "../../../../utils/TimeHelper";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import AppointmentsDrawer from './appointments-drawer.svelte';
    import {iconCheck, iconHeroRecycle, iconHeroWarning} from "../../../../lib/icons.js";
    import ControlsPopup from "./controls-popup.svelte";
    import StatusPopup from "./status-popup.svelte";

    export let timestamp, staffAccounts, staff, weekday, services,
        slotVisible = undefined, date, appointments, fetchStaff, fetchAppointments;

    let showControlsModal = false;
    let showStatusModal = false;
    let checkingIn = false;

    const dateTimestamp = new Date(date);
    const [hour, minute] = timestamp.split(":");
    dateTimestamp.setHours(parseInt(hour), parseInt(minute));

    let notWorking = !staff?.schedule?.[weekday]?.enabled;
    const onLunch = () => {
        if (!staff?.schedule?.[weekday]?.lunch?.start || !staff?.schedule?.[weekday]?.lunch?.end) return false;
        let lunchStart = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.start);
        let lunchEnd = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.end);
        let currentVal = TimeHelper.getSliderValFrom24(timestamp);
        return lunchStart <= currentVal && lunchEnd >= currentVal;
    }

    const isBlockedTime = () => {
        return staff.blocked_time ? staff.blocked_time.filter((block) => date.getDate() === FirebaseClient.toDate(block.date).getDate()).length : false;
    }

    let appointment, appHeight, appMargin;

    // Only render appointments at each hour
    $: if (appointments && appointments?.length && parseInt(minute) === 0) {
        let results = appointments.filter((app) => {
            if (app.staff === staff.doc_id) {
                const appDate = FirebaseClient.toDate(app.start);
                // Finding the appointment at the time stamp
                if (appDate.getDate() === date.getDate()) {
                    if (appDate.getHours() === dateTimestamp.getHours()) {
                        return true;
                    }
                }
            }

            return false;
        });

        if (results.length) {
            appointment = results[0];
            const start = FirebaseClient.toDate(appointment.start);
            const end = FirebaseClient.toDate(appointment.end);
            let minuteHeight = 100 / 30;
            let minutes = Math.round(
                Math.abs(end - start) / (60 * 1000)
            );

            // Height and margin from top @ the hour
            appHeight = (minuteHeight * minutes) - 2;
            appMargin = (minuteHeight * start.getMinutes());

            try {
                if (appointment?.lead) {
                    FirebaseClient.doc("leads", appointment.lead).then((user) => {
                        appointment["userInfo"] = user;
                    })
                } else if (appointment?.client) {
                    FirebaseClient.doc("clients", appointment.client).then((user) => {
                        appointment["userInfo"] = user;
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    function showStatusPopup(e, checkingIn1) {
        e.preventDefault();
        e.stopPropagation();
        checkingIn = checkingIn1;
        showStatusModal = true;
    }
</script>

<div class="container" class:notWorking={notWorking} class:onLunch={onLunch()} class:blocked={isBlockedTime()}>

    {#if appointment && appointment?.userInfo}
        <div class="appointment" style={`height: ${appHeight}px;margin-top: ${appMargin}px;`}
             on:click={() => showControlsModal = true}>
            <div class="header">
                <span class="displayName">{appointment?.userInfo?.displayName?.toLowerCase()}</span>
                {#if !appointment?.checkIn}
                    {#if new Date() > FirebaseClient.toDate(appointment.start)}
                        <span class="status red"><span class="icon">{@html iconHeroWarning}</span> Not checked in (<button
                                type="button" class="status-btn" on:click={(e) => showStatusPopup(e, true)}>check in</button>)</span>
                    {:else}
                        <span class="status yellow"><span class="icon">{@html iconHeroWarning}</span> Awaiting check in (<button
                                type="button"
                                on:click={(e) => showStatusPopup(e, true)}
                                class="status-btn">check in</button>)</span>
                    {/if}
                {:else}
                    {#if !appointment?.checkOut}
                        {#if new Date() > FirebaseClient.toDate(appointment.end)}
                            <span class="status red"><span
                                    class="icon">{@html iconHeroWarning}</span> Not checked out (<button type="button"
                                                                                                         on:click={(e) => showStatusPopup(e, false)}
                                                                                                         class="status-btn">checkout</button>)</span>
                        {:else}
                            <span class="status green"><span
                                    class="icon">{@html iconHeroRecycle}</span> In progress (<button type="button"
                                                                                                     on:click={(e) => showStatusPopup(e, false)}
                                                                                                     class="status-btn">checkout</button>)</span>
                        {/if}
                    {:else}
                             <span class="status green"><span
                                     class="icon">{@html iconCheck}</span> Completed</span>
                    {/if}
                {/if}
            </div>

            <div class="services">
                {#each appointment?.services as service}
                    <span>{services.find((s) => s.doc_id === service)?.name}</span>
                {/each}
            </div>

        </div>
    {:else}
    <span class="new-app-drawer" class:visible={slotVisible === timestamp + staff.doc_id}
          on:click={() => slotVisible = timestamp + staff.doc_id}>
                {#key slotVisible}
                    <AppointmentsDrawer bind:slotVisible={slotVisible} date={date} staff={staff} timestamp={timestamp}
                                        {fetchAppointments}/>
                {/key}
    </span>
    {/if}
</div>

{#if appointment && showControlsModal}
    <ControlsPopup {appointment} {fetchAppointments} {staffAccounts} {services} bind:visible={showControlsModal}/>
{/if}

{#if appointment && showStatusModal}
    <StatusPopup {appointment} {fetchAppointments} {checkingIn} bind:visible={showStatusModal} />
{/if}


<style lang="scss">
  .status-btn {
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    color: rgb(159, 162, 169);
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      color: rgb(255, 255, 255);
    }
  }

  .appointment {
    position: absolute;
    width: 100%;
    background: var(--nav-color);
    color: white;
    border-radius: 6px;
    padding: 0.5rem;
    z-index: 1;
    cursor: pointer;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 2rem;
      border-bottom: 2px solid var(--fuse-accent-700);
      padding: 0 0.5rem 0.25rem 0.5rem;

      .status {
        display: flex;
        align-items: center;


        .icon {
          transform: scale(0.5);
          margin-right: -0.5rem;
          margin-top: 0.25rem;
        }

        &.red {
          color: var(--fuse-warn);
          fill: var(--fuse-warn);
        }

        &.yellow {
          color: #fab005;
          fill: #fab005;
        }

        &.green {
          color: #51cf66;
          fill: #51cf66;
        }
      }

      .displayName {
        text-transform: capitalize;
      }
    }

    .services {
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.875rem;
    }

  }

  .container {
    display: flex;
    width: 100%;
    height: 99px;
    position: relative;
    overflow: visible;

    &:hover {
      .new-app-drawer {
        visibility: visible;
        opacity: 1;
        pointer-events: all;
      }
    }

    &.notWorking, &.onLunch, &.blocked {
      .new-app-drawer {
        display: none !important;
      }

      &:before {
        background: #d6d6d9;
        font-size: 3rem;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
      }
    }

    &.notWorking {
      &:before {
        content: 'OOO' !important;
      }
    }

    &.onLunch {
      &:before {
        content: 'LUNCH';
      }
    }

    &.blocked {
      &:before {
        content: 'BLOCKED';
      }
    }
  }

  .new-app-drawer {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;

    &.visible {
      visibility: visible;
      opacity: 1;
      pointer-events: all;
    }
  }
</style>