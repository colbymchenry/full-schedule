<script>
    export let count;
</script>

<div class="badge-container">
    <slot></slot>
    <div class="badge">{count}</div>
</div>

<style lang="scss">
  .badge-container {
    position: relative;
    display: flex;
    align-items: center;

    .badge {
      position: absolute;
      inset: 0 0 auto auto;
      margin-top: -8%;
      margin-right: 10%;
      padding-right: 6px;
      padding-left: 6px;
      border-radius: 9999px;
      background-color: rgb(79, 70, 222);
      color: rgb(255, 255, 255);
      font-size: 10px;
      line-height: 18px;
      text-align: center;
      z-index: 2;
    }
  }
</style>