<script>
    import {TimeHelper} from "../../../../utils/TimeHelper";
    import AppointmentsDrawer from './appointments-drawer.svelte';

    export let timestamp = undefined, staffAccounts = undefined, staff = undefined, weekday = undefined,
        slotVisible = undefined, date = undefined;

    const notWorking = !staff?.schedule?.[weekday]?.enabled;
    const onLunch = () => {
        if (!staff?.schedule?.[weekday]?.lunch?.start || !staff?.schedule?.[weekday]?.lunch?.end) return false;
        let lunchStart = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.start);
        let lunchEnd = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.end);
        let currentVal = TimeHelper.getSliderValFrom24(timestamp);
        return lunchStart <= currentVal && lunchEnd >= currentVal;
    }
</script> 

<div class="container" class:notWorking={notWorking} class:onLunch={onLunch()}>
             <span class="new-app-drawer"
                   class:visible={slotVisible === timestamp + staff.doc_id}
                   on:click={() => slotVisible = timestamp + staff.doc_id}>
                                    {#key slotVisible}
                                        <AppointmentsDrawer bind:slotVisible={slotVisible} date={date}
                                                            staff={staff} timestamp={timestamp}/>
                                    {/key}
            </span>
</div>

<style lang="scss">
  .container {
    display: flex;
    width: 100%;
    height: 99px;
    position: relative;

    &:hover {
      .new-app-drawer {
        visibility: visible;
        opacity: 1;
        pointer-events: all;
      }
    }

    &.notWorking, &.onLunch {
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