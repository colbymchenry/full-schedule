<svelte:head>
    <title>FS • Appointments</title>
</svelte:head>

<script>
    import Header from './_components/header.svelte';
    import Timestamp from './_components/timestamp.svelte';
    import Timeline from './_components/timeline.svelte';
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {Api} from "../../../utils/Api.js";
    import {showToast} from "../../../utils/logger.js";
    import {StringUtils} from "../../../utils/StringUtils.js";
    import {TimeHelper} from "../../../utils/TimeHelper.js";
    import Skeleton from 'svelte-skeleton/Skeleton.svelte'
    import {MathHelper} from "../../../utils/MathHelper.js";


    let selectedDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);

    $: weekday = selectedDate ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).split(",")[0].toLowerCase() : "";

    let slotVisible;

    let staffAccounts = new Promise(fetchStaff);
    let appointments = new Promise(fetchAppointments);

    async function fetchStaff() {
        try {
            let accounts = await FirebaseClient.collection("staff");

            if (!accounts.map(({uid}) => uid).join(",").length) {
                staffAccounts = [];
                return;
            }

            const {users} = await Api.get(`/api/user?ids=${accounts.map(({uid}) => uid).join(",")}`);

            staffAccounts = accounts.map((account) => {
                const user = users.find(({uid}) => uid === account?.uid);
                if (user) {
                    account["displayName"] = user.displayName;
                    account["email"] = user.email;
                    account["photoURL"] = user.photoURL;
                    account["phoneNumber"] = user.phoneNumber;
                    return account;
                }
            }).filter((account) => account !== undefined);
        } catch (error) {
            showToast();
        }
    }

    async function fetchAppointments() {
        try {
            appointments = await FirebaseClient.collection("appointments");

        } catch (error) {
            showToast("Error fetching appointments...");
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
            <Timeline/>
            <table>
                <thead class="shadow" class:fill={!staffAccounts || !staffAccounts.length}>
                <tr>
                    <!-- First empty slot for time slot -->
                    <th></th>
                    {#each staffAccounts as staff}
                        <th>
                            {#if staff?.photoURL}
                                <img class="avatar" src={staff.photoURL} loading="lazy" alt=""/>
                            {:else}
                                <div class="avatar">
                                    {StringUtils.getInitials(staff.displayName)}
                                </div>
                            {/if}
                            <span class="truncate">{staff.displayName}</span>
                        </th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                <!-- Key weekday so it re-renders each time the date changes -->
                {#key weekday}
                    {#each timeMap as timestamp (timestamp)}
                        <tr>
                            <!-- Insert time stamp in first column of each row-->
                            <td>
                                <span class:small={TimeHelper.convertTime24to12(timestamp).split(":")[1].includes("30")}>{TimeHelper.convertTime24to12(timestamp)}</span>
                            </td>
                            {#each staffAccounts as staff}
                                <td>
                                    <div class="appointment-container">
                                        <Timestamp timestamp={timestamp} staffAccounts={staffAccounts} staff={staff}
                                                   weekday={weekday} bind:slotVisible={slotVisible} bind:date={selectedDate} />
                                    </div>
                                </td>
                            {/each}
                        </tr>
                    {/each}
                {/key}

                </tbody>
            </table>
        {:catch error}

        {/await}
    </div>

</section>

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