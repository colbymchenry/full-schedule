<script>
    import {iconLogo} from "../../../lib/icons.js";
    import {bookingStore} from "../../../lib/stores.js";
    export let title, tip;
</script>


<div class="logo-container">
    {#if $bookingStore?.object?.store?.store?.logo}
        <img src={$bookingStore.object.store.store.logo} alt="Logo" loading="eager"/>
    {:else}
        {@html iconLogo}
    {/if}
</div>
{#if title}
    <h1>
        {@html title}
    </h1>
{:else}
    <br/>
{/if}
{#if tip}
    <div class="tip">
        {@html tip}
    </div>
{:else}
    <br/>
{/if}
<div class="form-container">
    <slot></slot>
</div>

<style lang="scss">
  h1:first-of-type {
    font-weight: 800;
    letter-spacing: 0;
    font-size: 38px;
    line-height: 44px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .logo-container {
    margin-left: 28%;
    transform: scale(1.8);

    img {
      width: 3rem;
      max-width: 3rem;
      min-width: 3rem;
    }
  }

  .tip {
    margin-top: -4%;
    font-size: 14px;
  }

  * :global(.login-form) {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-row-gap: 20px;
    padding: 2rem 0;
  }

  .form-container {
    margin: 0 0 15px;
  }
</style>