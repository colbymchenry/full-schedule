<script>
    import {
        iconChat,
        iconExitFullscreen,
        iconFullscreen,
        iconInbox,
        iconMenu,
        iconMenuOpen,
        iconSearch
    } from "../icons.js";
    import {writableNav} from "../stores.js";
    import {onDestroy} from "svelte";

    let isFullscreen = false;

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            isFullscreen = true;
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            isFullscreen = false;
        }
    }

    let isNavOpen;

    const unsubscribe = writableNav.subscribe(value => {
        isNavOpen = value;
    });

    onDestroy(unsubscribe);

    function toggleNav() {
        writableNav.update((value) => !value);
    }
</script>

<div class="top-bar">
    <div class="hamburger">
        <div class="icon" on:click={toggleNav}>
            {#if isNavOpen}
                {@html iconMenuOpen}
            {:else}
                {@html iconMenu}
            {/if}
        </div>
    </div>
    <div class="buttons">
        <div class="icon" on:click={toggleFullScreen}>
            {#if isFullscreen}
                {@html iconExitFullscreen}
            {:else}
                {@html iconFullscreen}
            {/if}
        </div>
        <div class="icon">
            {@html iconSearch}
        </div>
        <div class="badge-container">
            <div class="icon">
                {@html iconInbox}
            </div>
            <div class="badge">5</div>
        </div>
    </div>
</div>

<style lang="scss">
  .top-bar {
    position: relative;
    z-index: 2;
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgb(0 0 0 / 14%) -1px 1px 3px 0px;
    flex-grow: 1;
    background-color: #fff;

    .icon {
      display: flex;
      width: 64px;
      height: 64px;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      transform: scale(0.7);
      transition-property: all;
      transition-duration: 300ms;
      transition-timing-function: ease;
      color: rgb(100, 116, 137);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
      }
    }

    .buttons {
      display: flex;
    }

    .badge-container {
      position: relative;

      .badge {
        position: absolute;
        inset: 0 0 auto auto;
        margin-top: 8px;
        margin-right: 10%;
        padding-right: 8px;
        padding-left: 8px;
        border-radius: 40px;
        background-color: rgb(79, 70, 222);
        color: rgb(255, 255, 255);
        font-size: 12px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
</style>
