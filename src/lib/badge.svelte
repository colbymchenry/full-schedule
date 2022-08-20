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

    .badge {
      position: absolute;
      inset: 0 0 auto auto;
      margin-top: 8px;
      margin-right: 10%;
      padding-right: 8px;
      padding-left: 8px;
      border-radius: 40px;
      background-color: rgb(79, 70, 222);
      color: rgb(255, 255, 255);
      font-size: 12px;
      line-height: 20px;
      text-align: center;
    }
  }
</style>