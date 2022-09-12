<script>

    import {iconClose} from "../icons.js";
    import {browser} from "$app/env";

    export let label = undefined, icon = undefined, onClose = undefined;
    let visible = false;
    let drawer;
    let button;
    let marginAdjust;

    // Move drawer to the left if it is going off screen
    $: if (visible && drawer && browser) {
        if (drawer.getBoundingClientRect().right > window.innerWidth) {
            marginAdjust = `margin-left: -${drawer.getBoundingClientRect().right - window.innerWidth + 73}px;`;
        }


        // TODO: Figure out if it's going out of bounds on the Y axis
        // console.log(drawer.getBoundingClientRect().top + ":" + drawer.getBoundingClientRect().bottom)
        // console.log(window.innerHeight)
        //
        // if (drawer.getBoundingClientRect().bottom > window.innerHeight) {
        //     marginAdjust += `margin-top: -${drawer.getBoundingClientRect().bottom - window.innerHeight + 73}px;`;
        // }
    }

    function closeDrawer() {
        visible = false;
        if (onClose) {
            // wait 400ms for animation closing
            setTimeout(() => {
                onClose();
            }, 400);
        }
    }
</script>

<div bind:this={button} class="button">
    <div on:click={() => visible = true}><span class="icon">{@html icon}</span>
        {#if label}{label}{/if}
    </div>

    <div bind:this={drawer} class="drawer" style={marginAdjust ? marginAdjust : ""} class:visible={visible}>
        <div class="container">
            <button class="close-button" type="button" on:click={closeDrawer}><span>{@html iconClose}</span>
            </button>

            <slot></slot>
        </div>
    </div>
</div>


<style lang="scss">
  .button {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 0 #0003, 0 0 #00000024, 0 0 #0000001f;
    font-weight: 500;
    height: 40px;
    min-height: 40px;
    max-height: 40px;
    line-height: 1 !important;
    border-radius: 9999px !important;
    position: relative;

    &:hover {
      background-color: #473fc6;
    }

    > div:first-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      height: 40px;
      min-height: 40px;
      max-height: 40px;
      width: 40px;
      min-width: 40px;
      max-width: 40px;
      font-size: .875rem;
      cursor: pointer;
    }

    .icon {
      transform: scale(0.6);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .drawer {
      display: grid;
      pointer-events: none;
      width: 50rem;
      max-height: 0;
      z-index: 5;
      background-color: white;
      box-shadow: 0 0 #0000, 0 0 #0000, 0 0 15px 0 rgb(0 0 0 / 0.14);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 0.5rem;
      transition: max-height 0.4s ease;
      overflow: hidden;

      .container {
        width: 50rem;
        height: 30rem;
        max-height: 30rem;
        color: #1e293b;
        position: relative;

        .close-button {
          position: absolute;
          top: 0;
          right: 0;
          outline: none;
          background: none;
          border: none;
          transform: scale(0.75);
          cursor: pointer;
          color: var(--secondary-color);
        }
      }

      &.visible {
        pointer-events: unset;
        max-height: 30rem;
      }
    }
  }
</style>