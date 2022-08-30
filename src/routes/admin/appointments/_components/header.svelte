<script>
    import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
    import Button from '$lib/forms/button.svelte';
    import AppointmentsDrawer from './appointments-drawer.svelte';
    import {CalendarStyles} from "../../../../utils/CalendarStyles.js";
    import {iconChevronLeft, iconChevronRight} from "../../../../lib/icons.js";

    export let selectedDate;

    $: dateString = selectedDate ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "";

</script>

<div class="header">
    <div>
        <AppointmentsDrawer />
    </div>
    <div>
        <h1>{dateString}</h1>
    </div>
    <div>
        <Button type="button" color="icon" icon={iconChevronLeft} callback={() => {
                selectedDate.setDate(selectedDate.getDate() - 1);
                selectedDate = selectedDate;
            }} />
        <DatePicker styling={CalendarStyles.appointments()} format='MM / DD / YYYY' continueText={"Select"} bind:selected={selectedDate}></DatePicker>
        <Button type="button" color="icon" icon={iconChevronRight} callback={() => {
                selectedDate.setDate(selectedDate.getDate() + 1);
                selectedDate = selectedDate;
            }} />
    </div>
</div>

<style lang="scss">
  .header {
    position: sticky;
    top: 0;
    left: 0;
    height: 4rem;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    z-index: 3;

    h1 {
      letter-spacing: -.025em;
      line-height: 1;
      font-weight: 800;
      font-size: 2rem;
    }

    > div:last-of-type {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
</style>