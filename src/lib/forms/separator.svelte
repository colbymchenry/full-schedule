<script>
    export let label;
    export let height = "2.5rem";
</script>


<div style={`margin: ${height} 0`}>
    <div class="line"></div>
    {#if label}
        <span>{label}</span>
    {/if}
    <div class="line"></div>
</div>

<style lang="scss">
    div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

      .line {
        border-top: 1px solid var(--border-color);
        flex: 1 1 auto!important;
        margin-top: 1px;
      }

        > span {
          color: rgba(var(--fuse-text-secondary-rgb), 1);
          margin: 0 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
    }
</style>