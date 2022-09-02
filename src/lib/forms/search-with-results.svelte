<script>
    import InputField from './input-field.svelte';
    import {iconSearch} from "../icons.js";

    export let performSearch, searchResults;

    function onChange(e) {
        console.log(e)
    }
</script>

<div class="container">
    <InputField disablePrefill style="height: 20px;" icon={iconSearch} {onChange} />
    <div>
        {#each searchResults as result}
            <slot data={result}></slot>
        {/each}
    </div>
</div>

<style lang="scss">
  .container {
    position: relative;

    > div {
      display: none;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      max-height: 100px;
      overflow: auto;

      &.is--visible {
        display: block;
      }
    }
  }
</style>