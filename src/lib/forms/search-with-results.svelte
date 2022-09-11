<script>
    import InputField from './input-field.svelte';
    import {iconLoader, iconSearch} from "../icons.js";

    export let performSearch, style, onSelect;
    let searchResults = [];
    let showLoader = false;
    let focused = false;
    let visible = false;

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

    $: if (!focused) {
        // for some reason if focus is lost immediately the on:click functions of
        // the search result children does not get called.
        // Workaround is to wait
        setTimeout(() => {
            visible = false;
        }, 200);
    } else {
        if (searchResults.length) {
            visible = true;
        }
    }

</script>

<div class="container" {style}>
    <InputField disablePrefill style="height: 20px;" icon={iconSearch} {onChange} bind:focused={focused}/>
    <div class:is--visible={visible}>
        <div>
            {#each searchResults as result}
                <div class="block" on:click={() => {
                    if (onSelect) onSelect(result);
                }}><slot data={result}></slot></div>
            {/each}
        </div>
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
    margin-top: unset !important;

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
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      margin-top: 1.5rem;

      &.is--visible {
        display: block;
      }

      > div {
        display: flex;
        flex-direction: column;
        background: white;
        max-height: 100px;
        overflow-y: auto;
        overflow-x: hidden;
        border-left: 1px solid var(--border-color);
        border-bottom: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 2px 2px 0 rgb(0 0 0 / 0.1);
        padding-top: 1rem;

        .block {
          cursor: pointer;
          padding: 0.5rem;

          &:hover {
            background-color: var(--fuse-accent-100);
          }
        }
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