<svelte:head>
    <title>FS • Book</title>
</svelte:head>

<script context="module">
    export async function load({url, params}) {
        try {
            const res = await fetch(`${url.origin}/api/booking-setup?store=true`);
            const data = await res.json();
            return {props: {booking_setup: data}}
        } catch (error) {

        }
    }
</script>

<script>
    // have to import FirebaseClient to init analytics
    import {page} from '$app/stores';
    import {browser} from "$app/env";
    import {bookingStore} from "$lib/stores.js";
    import {JsonHelper} from "../../utils/JsonHelper.js";
    import {goto} from "$app/navigation";

    export let booking_setup;

    if ($page.url.pathname !== "/book" && !$bookingStore && booking_setup) {
        if (browser) {
            $bookingStore = new JsonHelper({ "store": booking_setup });
            goto("/book");
        }
    } else if (booking_setup) {
        $bookingStore = new JsonHelper({ "store": booking_setup });
    }

</script>

<div class="root">
    <div class="container">
        <div>
          <slot></slot>
        </div>
    </div>
</div>


<style lang="scss">
  .root {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    min-height: 100%;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex: 1 1 auto;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    .root {
      height: auto !important;
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      width: 100% !important;
      height: 100% !important;
      background: transparent !important;
      padding: 10vw !important;
      box-shadow: none !important;

      > div:first-of-type {
        min-width: auto !important;
      }
    }
  }

  .container {
    margin: auto;
    padding: 3rem;
    border-radius: 1rem;
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    width: auto;
    display: grid;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 16px;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    background-color: #fff;


    > div:first-of-type {
      position: relative;
      display: grid;
      min-width: 450px;
      grid-auto-columns: 1fr;
      grid-auto-rows: auto;
      grid-column-gap: 16px;
      grid-row-gap: 16px;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
</style>
