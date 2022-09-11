<script>
    import {TimeHelper} from "../../../../utils/TimeHelper";

    export let timestamp, staffAccounts, staff, weekday;

    const notWorking = !staff?.schedule[weekday] || !staff?.schedule[weekday]?.enabled;
    const onLunch = () => {
        if (!staff?.schedule[weekday]?.lunch?.start || !staff?.schedule[weekday]?.lunch?.end) return false;
        let lunchStart = TimeHelper.getSliderValFrom24(staff?.schedule[weekday]?.lunch?.start);
        let lunchEnd = TimeHelper.getSliderValFrom24(staff?.schedule[weekday]?.lunch?.end);
        let currentVal = TimeHelper.getSliderValFrom24(timestamp);
        return lunchStart <= currentVal && lunchEnd >= currentVal;
    }
</script>

<div class="container" class:notWorking={notWorking} class:onLunch={onLunch()}>

</div>

<style lang="scss">
    .container {
      display: flex;
      width: 100%;
      height: 99px;
      max-width: 300px;
      position: relative;

      &.notWorking,&.onLunch {
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


</style>