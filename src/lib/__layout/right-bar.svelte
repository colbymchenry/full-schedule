<script>
    import Button from '$lib/forms/button.svelte';
    import {iconChat} from "../icons.js";
</script>


<div class="right-bar">
    <div>
        <Button icon={iconChat} color="icon"/>
    </div>
    <div>

    </div>
</div>


<style lang="scss">
  @media print {
    .right-bar {
      visibility: hidden;
      display: none;
    }
  }

  .right-bar {
    display: flex;
    flex-direction: column;
    width: 64px;
    background-color: white;
    z-index: 2;

    > div:first-of-type {
      height: 64px;
      border-left: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: center;
      align-items: center;

      > button {
        transform: scale(3) !important;
      }
    }

    > div:last-of-type {
      flex-grow: 1;
      box-shadow: rgb(0 0 0 / 5%) -1px 1px 3px 0px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
