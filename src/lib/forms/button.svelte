<script>
    export let color = "primary";
    export let type = "submit";
    export let icon;
    export let callback;
</script>

{#if icon}
    <button {type} class={'icon'} on:click={callback}>{@html icon}</button>
{:else}
    <button {type} class={'btn ' + color} on:click={callback}><span><slot></slot></span></button>
{/if}

<style lang="scss">
  .icon {
    display: flex;
    width: 64px;
    height: 64px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    transform: scale(0.7);
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease;
    color: rgb(100, 116, 137);
    cursor: pointer;
    transition: all 0.3s ease;
    outline: none;
    border: none;
    background: none;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
  }

  .btn {
    position: relative;
    display: inline-block;
    padding: 15px;
    background-color: var(--primary-color);
    color: white;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 20px;
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .btn > span {
    z-index: 2;
    position: relative;
  }

  .btn:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
  }
</style>