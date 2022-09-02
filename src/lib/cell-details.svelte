<script>
    import Button from '$lib/forms/button.svelte';
    import {iconChevronDown, iconChevronUp} from "./icons.js";

    export let openIndex, index, maxHeight = '30rem';
    let form_errors = {};

    function buttonPress() {
        if (openIndex === index) {
            openIndex = -1;
        } else {
            openIndex = index;
        }
    }
</script>

<Button type="button" color="icon" icon={openIndex === index ? iconChevronUp : iconChevronDown} callback={buttonPress}/>

<div class="details shadow-lg" class:is--open={openIndex === index} style={`height: ${maxHeight};`}>
    <div class="container" style={`min-height: ${maxHeight};max-height: ${maxHeight};`}>
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .details {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 0;
    background-color: white;
    transition: max-height 0.4s var(--transition-drawer);
    z-index: 1;
    overflow: hidden;
    display: flex;
    align-items: flex-end;

    .container {
      width: 100%;
      display: flex;
    }

    &.is--open {
      max-height: 70vh;
      border-top: 1px solid var(--border-color);
    }

    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>