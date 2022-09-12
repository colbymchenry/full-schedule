<script>
    export let active = false, onClick = undefined;
</script>



<div class="track" class:active={active} on:click={() => {
    if (onClick) {
        onClick(!active);
    }

     active = !active
}}>
    <div class="thumb-container">
        <div class="thumb"></div>
    </div>
</div>

<style lang="scss">
  .track {
    position: relative;
    width: 36px;
    height: 14px;
    flex-shrink: 0;
    border-radius: 8px;
    margin-right: 8px;
    margin-left: 0;
    background-color: #94a3b8;
    transition: all 80ms linear;
    transition-property: background-color;
    transition-delay: 50ms;
    cursor: pointer;

    .thumb-container {
      position: absolute;
      z-index: 1;
      width: 20px;
      height: 20px;
      top: -3px;
      left: 0;
      transform: translate3d(0, 0, 0);
      transition: all 80ms linear;
      transition-property: transform;

      &:hover {
        &::before {
          position: absolute;
          content: '';
          min-width: 40px;
          min-height: 40px;
          top: -10px;
          left: -10px;
          z-index: 1;
          background-color: rgba(var(--fuse-accent-400-rgb), 0.1);
          border-radius: 100%;
        }
      }


      .thumb {
        background-color: #fafafa;
        box-shadow: 0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f;
        transition: all 80ms linear;
        transition-property: background-color;
        transition-delay: 50ms;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: block;
      }
    }

    &.active {
      background-color: rgba(var(--fuse-primary-500-rgb), .54) !important;

      .thumb-container {
        transform: translate3d(16px, 0, 0);

        &:hover {
          &::before {
            background-color: rgba(var(--fuse-primary-rgb), 0.1);
          }
        }

        .thumb {
          background-color: var(--fuse-primary);
        }
      }
    }
  }
</style>