<script>
    import Spinner from "./spinner.svelte";
    export let color = "primary";
    export let type = "submit";
    export let isIcon = undefined;
    export let icon = undefined;
    export let callback = undefined;
    export let style = undefined;
    export let loading = false;
    export let disabled = loading;
</script>

{#if (icon && color === "icon") || isIcon }
    <button {type} {style} disabled={loading || disabled} class={`icon ${color ? color : ''}`} class:loading={loading} on:click={callback}><span>{#if loading}<Spinner color="#94a3b8" size="1.5rem" />{:else}{@html icon}{/if}</span></button>
{:else}
    <button {type} {style} disabled={loading || disabled} class={`btn ${icon ? 'has--icon ' : ''}` + color} class:loading={loading} on:click={callback}><span>{#if loading}<Spinner color="#94a3b8" size="1.5rem" />{:else}{#if icon}<div class="icon">{@html icon}</div>{/if}<slot></slot> {/if}</span>
    </button>
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
    padding: 0 1rem !important;
    border-radius: 9999px !important;
    box-sizing: content-box;
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
    justify-self: flex-start;

    &.loading {
      cursor: not-allowed;
    }

    &:disabled {
      color: var(--fuse-accent-400) !important;
      background-color: var(--fuse-accent-200) !important;
    }

    &.has--icon {

      .icon {
        transform: scale(0.6);
        color: white;
        margin-left: -1rem;

        &:hover {
          background-color: transparent;
        }
      }

      padding-right: 1rem !important;

      span {
        gap: 0;
      }
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    &.secondary {
      background-color: rgba(0, 0, 0, 0);
      color: #1e293a;
      border: 1px solid var(--primary-border-color);

      &:hover {
        background-color: #dde3e9;
      }

      .icon {
        transform: scale(0.5);
        color: var(--icon-gray);
      }

      span {
        gap: 0;
      }
    }

    &.delete {
      background-color: transparent;
      color: var(--error-color);
      &:hover {
        background-color: #f4e4e5;
      }
    }

    &.cancel {
      background-color: transparent;
      color: var(--fuse-accent-rgb);

      &:hover {
        background-color: #e2e7ed;
      }
    }

    &:hover {
      background-color: #473fc6;
    }

    &.input {
      display: flex;
      align-items: center;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(203 213 225 / 1);
      padding: 2px 16px 2px 40px !important;
      border-radius: 6px !important;
      background: #fff;
      box-shadow: var(--input-box-shadow);
      position: relative;
      color: #333;

      .icon {
        transform: scale(0.5);
        position: absolute;
        color: var(--icon-gray);
        left: 0;
        margin-left: 0;
      }
    }
  }

  .icon {
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-size: .875rem;
    font-weight: 500;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    max-height: 40px;
    line-height: 1 !important;
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

    &:disabled {
      color: rgba(var(--fuse-text-disabled-rgb), 1);
      cursor: default;

      &:hover {
        background-color: transparent;
      }
    }

    &:hover {
      background-color: #e8ebee;
    }

    span {
      position: relative;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      height: 100%;
      //z-index: 2;
      transform: scale(0.6);
    }

    &.delete {
      background-color: transparent;
      color: var(--error-color);
      &:hover {
        background-color: #f4e4e5;
      }
    }
  }
</style>