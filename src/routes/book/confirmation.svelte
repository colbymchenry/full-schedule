<script>
    import {bookingStore} from "$lib/stores.js";
    import Form from "$lib/forms/form.svelte";
    import BookingLayout from "./_components/BookingLayout.svelte";
    import {StringUtils} from "../../utils/StringUtils.js";

    console.log($bookingStore)

    let address = $bookingStore.get("store.address.street1");

    if ($bookingStore.get("store.address.street2")) {
        address += ", " + $bookingStore.get("store.address.street2");
    }

    if ($bookingStore.get("store.address.city")) {
        address += ", " + $bookingStore.get("store.address.city");
    }

    if ($bookingStore.get("store.address.state")) {
        address += ", " + $bookingStore.get("store.address.state");
    }

    if ($bookingStore.get("store.address.zip")) {
        address += " " + $bookingStore.get("store.address.zip");
    }

    let appleMapsURL = `https://maps.apple.com/?address=${encodeURIComponent(address)}`;
    let googleMapsURL = `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
    let wazeURL = `https://waze.com/ul?q=${encodeURIComponent(address)}`;

</script>

<BookingLayout title="Booking Confirmed!"
               tip={`Thank you for choosing ${$bookingStore.get("store.store.name")}!<br /><br />
                    Please give us a call at <a href="tel:${$bookingStore.get("store.store.phone")}">${StringUtils.formatPhoneNumber($bookingStore.get("store.store.phone"))}</a>
                    if you need to modify or cancel your appointment.`}>

    <Form id="login-form" class="login-form" hideFooter>
        <div class="container">

        </div>
    </Form>

</BookingLayout>

<style lang="scss">
  .container {
    max-height: 20rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr;
    border-radius: 0.5rem;

    > div {
      border-top: 1px solid var(--border-color);
      padding: 0.5rem 0;
    }

    > div:first-of-type {
      border-top: none !important;
    }
  }

  @media screen and (max-width: 600px) {
    .container {
      border: 1px solid var(--border-color);

      > div {
        padding: 0.5rem 0.5rem;
      }
    }
  }
</style>