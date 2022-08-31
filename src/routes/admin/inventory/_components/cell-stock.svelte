<script>
    import {iconInfinity} from "../../../../lib/icons.js";

    export let data, rowData;
</script>

<div class="stock">
    {#if data}
        {data}
        <div
                class:good={parseInt(data) >= parseInt(rowData["stock"]["target"]) * 0.75}
                class:warning={parseInt(data) > parseInt(rowData["stock"]["target"]) * 0.25}
                class:danger={parseInt(data) <= parseInt(rowData["stock"]["target"]) * 0.25}
        ></div>
    {:else}
        <span>{@html iconInfinity}</span>
    {/if}
</div>

<style lang="scss">
  .stock {
    position: relative;
    display: flex;

    > span {
      transform: scale(0.5);
      float: left;
      margin-left: -0.25rem;
      color: #54acdc;
    }

    > div {
      min-height: 100%;
      width: 0.25rem;
      margin-left: 0.25rem;
      border-radius: 0.25rem;
      position: relative;
      overflow: hidden;

      &.good {
        background-color: #54dc87 !important;

        &::after {
          background-color: transparent !important;
        }
      }

      &.warning {
        background-color: #fbd7ad;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          content: '';
          background-color: #f7934b;
        }
      }

      &.danger {
        background-color: #fbcaca;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25%;
          content: '';
          background-color: #d82e2d;
        }
      }
    }
  }

</style>