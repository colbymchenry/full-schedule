<script>
    export let open = false;
</script>

<section class="full-vh" class:open={open}>
    <div class="content">
        <slot></slot>
    </div>
</section>

<style lang="scss">
   .content {
     min-width: 640px;
     position: relative;
   }

    section {
      display: flex;
      flex-shrink: 1;
      width: 0;
      overflow: hidden;
      border-left: solid 1px #e2e8f0;
      background-color: #fff;
      color: #1e293b;
      z-index: 1;
      right: 0;
      overflow-y: auto;
      transition: width 0.4s var(--transition-drawer);

      &.open {
        width: 40rem !important;
      }
    }


</style>