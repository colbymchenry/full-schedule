<script>
    import InputField from './input-field.svelte';
    import {iconLoader, iconSearch} from "../icons.js";

    export let performSearch, style;
    let searchResults = [];
    let showLoader = false;

    let callbackTimeout;

    function onChange(value) {
        showLoader = true;
        if (callbackTimeout) clearInterval(callbackTimeout);

        if (value && performSearch) {
            callbackTimeout = setTimeout(async () => {
                searchResults = await performSearch(value);
                showLoader = false;
            }, 1000);
        } else if (!value) {
            searchResults = [];
            showLoader = false;
        }
    }
</script>

<div class="container" {style}>
    <InputField disablePrefill style="height: 20px;" icon={iconSearch} {onChange}/>
    <div>
        {#each searchResults as result}
            <slot data={result}></slot>
        {/each}
    </div>

    <div class="loader" class:is--visible={showLoader}>
        <span>{@html iconLoader}</span>
    </div>
</div>

<style lang="scss">

  .loader {
    position: absolute;
    display: none;
    justify-content: flex-end;
    align-items: center;

    &.is--visible {
      display: flex !important;
    }

    > span {
      margin-top: -0.6rem;
      animation: spin 0.8s linear infinite;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }

  .container {
    position: relative;

    > div {
      display: none;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      max-height: 100px;
      overflow: auto;
      position: absolute;
      top: 0;
      left: 0;

      &.is--visible {
        display: block;
      }
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg) scale(0.5);
    }
    100% {
      transform: rotate(360deg) scale(0.5);
    }
  }
</style>