<script>

    import {onDestroy, onMount} from "svelte";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";

    let now = new Date();
    let interval;
    let visible = true;

    onMount(() => {
        interval = setInterval(() => {
            now = new Date();
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    let marginTop = 0;

    $: {
        if (now.getHours() === 4) {
            marginTop = now.getMinutes() * (100 / 30);
            visible = true;
            // make visible again
        } else if (now.getHours() >= 20) {
            // hide at the end of the day at 8pm
            visible = false;
        }

        const hours = now.getHours() - 4;
        const minutes = now.getMinutes();
        const totalMinutes = (hours * 60) + minutes;

        marginTop = totalMinutes * (100 / 30);
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
    z-index: 2;
    border-top: 1px solid var(--primary-color);
    transition: all 0.3s ease;
    display: none;

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