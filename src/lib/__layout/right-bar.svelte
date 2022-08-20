<script>
    import Button from '$lib/forms/button.svelte';
    import {iconChat} from "../icons.js";
</script>


<div class="right-bar">
    <div>
        <Button icon={iconChat}/>
    </div>
    <div>

    </div>
</div>


<style lang="scss">
  .right-bar {
    display: flex;
    flex-direction: column;
    width: 64px;
    background-color: white;

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
      box-shadow: rgb(0 0 0 / 14%) -1px 1px 3px 0px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
