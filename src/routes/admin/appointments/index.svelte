<svelte:head>
    <title>FS • Appointments</title>
</svelte:head>

<script>
    import Header from './_components/header.svelte';
    import BlockTimePopup from './_components/block-time-popup.svelte';
    import Timestamp from './_components/timestamp.svelte';
    import Timeline from './_components/timeline.svelte';
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {showToast} from "../../../utils/logger.js";
    import {StringUtils} from "../../../utils/StringUtils.js";
    import {TimeHelper} from "../../../utils/TimeHelper.js";
    import Skeleton from 'svelte-skeleton/Skeleton.svelte'
    import {MathHelper} from "../../../utils/MathHelper.js";
    import {settings} from "../../../lib/stores.js";
    import {where} from "firebase/firestore";
    import {iconCancel, iconClock} from "../../../lib/icons.js";
    import Button from "$lib/forms/button.svelte";

    let selectedDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);

    $: weekday = TimeHelper.timezoneOffset(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).split(",")[0].toLowerCase();

    let slotVisible;

    let showBlockTimePopup = false;
    let selectedStaff = null;

    let services = new Promise(fetchServices);
    let staffAccounts = new Promise(fetchStaff);
    let appointments = [];

    async function fetchStaff() {
        try {
            staffAccounts = await FirebaseClient.collection("staff");
            // Filter out staff with no schedules
            staffAccounts = staffAccounts.filter((staff) => staff?.schedule &&
                Object.values(staff.schedule).filter((day) => day.enabled === true && day?.day?.start && day?.day?.end).length);

            let blockedTime = await FirebaseClient.collection("blocked_time");
            staffAccounts = staffAccounts.map((staffAcct) => {
                staffAcct["blocked_time"] = blockedTime.filter((block) => block.staff === staffAcct.doc_id) || [];
                return staffAcct;
            })

            appointments = new Promise(fetchAppointments);
        } catch (error) {
            showToast();
        }
    }

    async function fetchAppointments() {
        try {
            appointments = await FirebaseClient.query("appointments", where("cancelled", "!=", true))
        } catch (error) {
            showToast("Error fetching appointments...");
        }
    }

    async function fetchServices() {
        try {
            services = await FirebaseClient.collection("services");
        } catch (error) {
            showToast("Error fetching services...");
        }
    }

    // get an array of slider time values from 4am to 8pm
    let timeMap = [];
    for (let hour = 4; hour <= 20; hour += 0.5) timeMap.push(TimeHelper.sliderValTo24(hour));
</script>

<section>
    <Header bind:selectedDate={selectedDate}/>

    <div class="container">
        {#await staffAccounts}
            <div style="max-width: 100%;display: flex;padding-left: 4.5rem;">
                {#each [0, 1, 2, 3] as number (number)}
                    <Skeleton width="100%" height="75px">
                        <circle cx="50" cy="50" r="24" stroke="black"/>
                        <rect width={MathHelper.getNumberFromRange(100, 280)} height="10" x="90" y="44" rx="5" ry="5"/>
                    </Skeleton>
                {/each}
            </div>
        {:then data}
            {#if new Date().getDate() === selectedDate.getDate()}
                <Timeline/>
            {/if}
            <table>
                <thead class="shadow" class:fill={!staffAccounts || !staffAccounts.length}>
                <tr>
                    <!-- First empty slot for time slot -->
                    <th></th>
                    {#each staffAccounts as staff}
                        <th>
                            <div style="display: flex;justify-content: space-between;align-items: center;">
                                <div style="display: flex;align-items: center;">
                                    {#if staff?.photoURL}
                                        <img class="avatar" src={staff.photoURL} loading="lazy" alt=""/>
                                    {:else}
                                        <div class="avatar">
                                            {StringUtils.getInitials(staff.displayName)}
                                        </div>
                                    {/if}
                                    <span class="truncate">{staff.displayName}</span>
                                </div>

                                <Button color="icon" icon={iconCancel} type="button" callback={() => {
                                    selectedStaff = staff;
                                    showBlockTimePopup = true;
                                }}></Button>
                            </div>

                        </th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                {#each timeMap as timestamp (timestamp)}
                    <tr>
                        <!-- Insert time stamp in first column of each row-->
                        <td>
                            <span class:small={TimeHelper.convertTime24to12(timestamp).split(":")[1].includes("30")}>{TimeHelper.convertTime24to12(timestamp)}</span>
                        </td>
                        {#key weekday}
                            {#each staffAccounts as staff}
                                <td>
                                    <div class="appointment-container">
                                        <Timestamp timestamp={timestamp} staffAccounts={staffAccounts} staff={staff}
                                                   bind:slotVisible={slotVisible} bind:appointments={appointments}
                                                   services={services} date={selectedDate} weekday={weekday}
                                                   fetchStaff={fetchStaff} fetchAppointments={fetchAppointments}/>
                                    </div>
                                </td>
                            {/each}
                        {/key}
                    </tr>
                {/each}
                </tbody>
            </table>
        {:catch error}

        {/await}
    </div>

</section>


{#if showBlockTimePopup && selectedStaff}
    <BlockTimePopup {fetchAppointments} {staffAccounts} date={selectedDate} staff={selectedStaff} bind:visible={showBlockTimePopup} onClose={() => {
        selectedStaff = null;
    }}/>
{/if}

<style lang="scss">

  .appointment-container {
    //max-width: 300px;
    min-width: 300px;
    position: relative;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }

  section {
    position: relative;
  }

  .container {
    position: relative;
    min-width: 100%;
    text-align: left;
    max-height: calc(100vh - var(--top-bar-height) - var(--top-bar-height));
    max-width: calc(100vw - var(--top-bar-height) - var(--nav-width));
    overflow: auto;


    table {
      min-width: 100%;

      // styles for the time slots
      tbody tr > td:first-of-type, thead tr > th:first-of-type {
        max-width: 6rem;
        min-width: 6rem;
        width: 6rem;
        position: relative;
        border-top: none;

        > span {
          top: -0.55rem;
          right: 0.5rem;
          position: absolute;

          &.small {
            font-size: 0.8rem;
            color: var(--secondary-color);
          }
        }
      }

      tbody {
        vertical-align: top;
      }

      // styles for each timestamp
      tbody > tr {
        height: 100px;

        // each actual time slot to display an appointment
        td {
          border-right: 1px solid var(--border-color);
          border-top: 1px solid var(--border-color);
          min-width: 300px;
          position: relative;


        }

        // first column with the time stamp
        td:first-of-type {
          min-width: unset;
          position: sticky;
          left: 0;
          background-color: var(--bg-color);
          z-index: 3;
          display: flex;
        }
      }


      thead {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 4;
        height: var(--top-bar-height);

        &.fill {
          background: white;
        }

        tr {

          // time slot in sticky header
          th:first-of-type {
            background-color: transparent;
          }

          // staff sticky header
          th {
            background-color: white;
            padding: 0.5rem;
            text-transform: capitalize;
          }
        }
      }

      // staff avatar
      thead > tr > th {
        .avatar {
          object-fit: cover;
          border-radius: 9999px;
          width: 2.5rem;
          height: 2.5rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          background-color: #e0e6ee;
          color: #475569;
          text-transform: uppercase !important;
          margin-right: 0.5rem;
        }
      }
    }
  }

</style>