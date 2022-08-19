<script>
    import {iconChat, iconFullscreen, iconInbox, iconMenu, iconMenuOpen, iconSearch} from "../icons.js";

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }


</script>

<div class="main-container__top-bar">
    <div class="top-bar__hamburger">
        <div data-w-id="7d1fbe9c-4fd3-e6a2-ef89-c29a883f5149" class="top-bar__icon top-bar__menu-icon w-embed">
            {@html iconMenu}
        </div>
        <div data-w-id="7d1fbe9c-4fd3-e6a2-ef89-c29a883f514a" class="top-bar__icon is--hidden top-bar__icon-menu-open w-embed">
            {@html iconMenuOpen}
        </div>
    </div>
    <div class="top-bar__buttons">
        <div class="top-bar__icon w-embed" on:click={toggleFullScreen}>
            {@html iconFullscreen}
        </div>
        <div class="top-bar__icon w-embed">
            {@html iconSearch}
        </div>
        <div class="badge">
            <div class="top-bar__icon badge__icon w-embed">
                {@html iconInbox}
            </div>
            <div class="text-block">5</div>
        </div>
    </div>
</div>
<div id="w-node-e43b6e59-753f-b532-1182-06e8a754ad1d-a754ad1d" class="main-container__top-right">
    <div data-w-id="e43b6e59-753f-b532-1182-06e8a754ad1e" class="top-bar__icon top-right__icon w-embed">
        {@html iconChat}
    </div>
</div>


<style>

</style>
