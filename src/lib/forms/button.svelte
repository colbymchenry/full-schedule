<script>
    export let color = "primary";
    export let type = "submit";
</script>

<button {type} class={'btn ' + color}><span><slot></slot></span></button>

<style lang="scss">
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