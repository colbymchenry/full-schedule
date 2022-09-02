<script>
    import {
        iconExitFullscreen,
        iconFullscreen,
        iconInbox,
        iconMenu,
        iconMenuOpen,
        iconSearch
    } from "../icons.js";
    import Button from "$lib/forms/button.svelte";
    import Badge from "$lib/badge.svelte";
    import {navStore} from "../stores.js";

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

    function toggleNav() {
        navStore.update((value) => !value);
    }

    let topBar;
</script>

<div class="container">
    <div class="top-bar" bind:this={topBar}>
        <div class="hamburger">
            <Button callback={toggleNav} icon={$navStore ? iconMenuOpen : iconMenu} color="icon" />
        </div>
        <div class="buttons">
            <Button callback={toggleFullScreen} icon={isFullscreen ? iconExitFullscreen : iconFullscreen} color="icon" />
            <Button icon={iconSearch} color="icon" />
            <Badge count={5}>
                <Button icon={iconInbox} color="icon" />
            </Badge>
        </div>
    </div>
    <div class="content" style={`max-height: calc(100vh - ${topBar?.clientHeight}px);`}>
        <slot></slot>
    </div>
</div>

<style lang="scss">

  @media print {
    .top-bar {
      visibility: hidden;
      display: none;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: -webkit-fill-available;
    position: relative;
    max-width: calc(100vw - var(--nav-width) - var(--top-bar-height));
    overflow: hidden;
  }

  .content {
    position: relative;
    overflow-y: auto;
  }

  .top-bar {
    position: relative;
    z-index: 2;
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    box-shadow: rgb(0 0 0 / 14%) -1px 1px 3px 0px;
    background-color: #fff;
    padding: 0 1.5rem;

    .buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .hamburger {
      display: flex;
      align-items: center;
    }
  }
</style>
