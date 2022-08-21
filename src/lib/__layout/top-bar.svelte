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
    import {browser} from "$app/env";

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
</script>

<div class="container">
    <div class="top-bar">
        <div class="hamburger">
            <Button callback={toggleNav} icon={$navStore ? iconMenuOpen : iconMenu} />
        </div>
        <div class="buttons">
            <Button callback={toggleFullScreen} icon={isFullscreen ? iconExitFullscreen : iconFullscreen} />
            <Button icon={iconSearch} />
            <Badge count={5}>
                <Button icon={iconInbox} />
            </Badge>
        </div>
    </div>
    <div class="content">
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: -webkit-fill-available;
  }

  .content {
    position: relative;
    max-height: calc(100vh - var(--top-bar-height));
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
