<script>
    import Button from '$lib/forms/button.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import {iconCalendar, iconChevronLeft, iconChevronRight} from "../../../../lib/icons.js";
    import {settings} from "../../../../lib/stores.js";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";

    export let selectedDate = new Date();
    let reRender = false;

    $: dateString = TimeHelper.timezoneOffset(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

</script>

<div class="header">
    <div>
        <Button type="button" color="icon" icon={iconChevronLeft} callback={() => {
                selectedDate.setDate(selectedDate.getDate() - 1);
                selectedDate = selectedDate;
                reRender = !reRender;
            }}/>
        {#key reRender}
            <InputField type="date" icon={iconCalendar} bind:value={selectedDate} dateProps={{
                    closeOnSelection: true
            }}/>
        {/key}
        <Button type="button" color="icon" icon={iconChevronRight} callback={() => {
                selectedDate.setDate(selectedDate.getDate() + 1);
                selectedDate = selectedDate;
                reRender = !reRender;
            }}/>
    </div>
    <div>
        <h1>{dateString}</h1>
    </div>
    <div>

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
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    z-index: 5;

    h1 {
      letter-spacing: -.025em;
      line-height: 1;
      font-weight: 800;
      font-size: 1.5rem;
      text-align: center;
      white-space: nowrap;

      @media screen and (max-width: 800px) {
        font-size: 1.2rem;
      }
    }

    > div:first-of-type {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      justify-self: flex-start;
    }
  }
</style>