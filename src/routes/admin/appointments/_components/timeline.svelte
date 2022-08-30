<script>

    import {onDestroy, onMount} from "svelte";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";

    let now = new Date();
    let interval;
    let visible = true;

    onMount(() => {
        now.setHours(5)
        interval = setInterval(() => {
            now = new Date();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    let marginTop = 0;

    $: {
        const timestampHeight = 100; // in pixels which equates to 30 minutes
        const hoursPassed = now.getHours() - 4; // calendar starts at 4am
        const minutes = now.getMinutes(); // get the minutes to adjust inside of timestamp
        const minuteHeight = timestampHeight / 30;
        const totalMinutes = (hoursPassed * 60) + minutes;

        // hide if before 4am or after 8pm
        if (hoursPassed < 0 || now.getHours() > 20) {
            visible = false;
        } else {
            marginTop = totalMinutes * minuteHeight;
            marginTop += (hoursPassed * 3.65);
        }
    }

</script>

<div style={`margin-top: ${marginTop}px;`} class:visible={visible}>
    <span>{TimeHelper.convertTime24to12(now.getHours() + ":" + now.getMinutes())}</span>
</div>

<style lang="scss">
  div {
    position: absolute;
    left: 20px;
    width: calc(100% - 20px);
    height: 1px;
    overflow: visible;
    z-index: 4;
    border-top: 1px solid var(--primary-color);
    transition: all 0.3s ease;
    display: none;
    top: 58px;

    &.visible {
      display: block;
    }

    span {
      position: absolute;
      margin-top: -16px;
      background: var(--primary-color);
      padding: 5px 15px 5px 5px;
      border-radius: 4px 50% 50% 4px;
      color: white;
    }
  }
</style>