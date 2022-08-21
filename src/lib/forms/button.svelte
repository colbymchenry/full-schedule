<script>
    export let color = "primary";
    export let type = "submit";
    export let icon;
    export let callback;
    export let style;
</script>

{#if icon}
    <button {type} {style} class={'icon'} on:click={callback}><span>{@html icon}</span></button>
{:else}
    <button {type} {style} class={'btn ' + color} on:click={callback}><span><slot></slot></span></button>
{/if}

<style lang="scss">
  .btn {
    background-image: none;
    font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    font-size: .875rem;
    font-weight: 500;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-height: 40px;
    max-height: 40px;
    line-height: 1 !important;
    padding: 0 20px !important;
    border-radius: 9999px !important;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    min-width: 64px;
    overflow: visible;
    color: #fff;
    background-color: var(--primary-color);
    box-shadow: 0 0 #0003, 0 0 #00000024, 0 0 #0000001f;
    transition: all 0.3s ease;

    &.secondary {
      background-color: rgba(0, 0, 0, 0);
      color: #1e293a;
      border: 1px solid var(--primary-border-color);

      &:hover {
        background-color: #dde3e9;
      }
    }

    &:hover {
      background-color: #473fc6;
    }
  }

  .icon {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-size: .875rem;
    font-weight: 500;
    display: inline-flex!important;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    max-height: 40px;
    line-height: 1!important;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    cursor: pointer;
    outline: none;
    border: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    white-space: nowrap;
    text-decoration: none;
    vertical-align: baseline;
    text-align: center;
    margin: 0;
    overflow: visible;
    padding: 0;
    min-width: 0;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    color: #637388;
    background: transparent;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e8ebee;
    }

    span {
      position: relative;
      display: inline-flex!important;
      align-items: center;
      justify-content: center;
      height: 100%;
      z-index: 2;
      transform: scale(0.6);
    }
  }
</style>