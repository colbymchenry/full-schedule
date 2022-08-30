<script>
    import AppDrawer from '$lib/drawers/app-drawer.svelte';
</script>

<AppDrawer title="New Appointment">

</AppDrawer>


<style lang="scss">
  .button {

    background: #0f1728;
    color: white;
    border-radius: 7px;
    box-shadow: 0 0 3px rgb(0 0 0 / 10%);
    height: 2.4rem;
    position: relative;

    > div:first-of-type {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      height: 2.4rem;
      font-size: 13px;
      padding: 0 1rem;
      cursor: pointer;
    }

    .icon {
      transform: scale(0.4);
      overflow: hidden;
      margin-right: -0.25rem;
      margin-left: -0.5rem;
    }

    .drawer {
      display: grid;
      pointer-events: none;
      width: 50rem;
      max-height: 0;
      z-index: 5;
      background-color: white;
      box-shadow: 0 0 #0000, 0 0 #0000, 0 0 15px 0 rgb(0 0 0 / 0.14);
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -5.8rem;
      margin-top: -1.3rem;
      border-radius: 0.5rem;
      transition: max-height 0.4s ease;
      overflow: hidden;

      .container {
        width: 50rem;
        height: 30rem;
        max-height: 30rem;

        .close-button {
          position: absolute;
          top: 0;
          right: 0;
          outline: none;
          background: none;
          border: none;
          transform: scale(0.75);
          cursor: pointer;
        }
      }

      &.visible {
        pointer-events: unset;
        max-height: 30rem;
      }
    }
  }
</style>