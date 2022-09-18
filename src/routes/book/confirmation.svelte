<script>
    import {bookingStore} from "$lib/stores.js";
    import Form from "$lib/forms/form.svelte";
    import Avatar from "$lib/avatar.svelte";
    import BookingLayout from "./_components/BookingLayout.svelte";
    import {StringUtils} from "../../utils/StringUtils.js";
    import {appleMapsLogo, googleMapsLogo, wazeLogo} from "../../lib/icons.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {TimeHelper} from "../../utils/TimeHelper.js";

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

    let staff = $bookingStore.get("staff");
    let selectedServices = $bookingStore.get("services").filter((service) => $bookingStore.get("appointment.services").includes(service.doc_id));
</script>

<BookingLayout title="Booking Confirmed!"
               tip={`Thank you for choosing ${$bookingStore.get("store.store.name")}!<br /><br />
                    Please give us a call at <a href="tel:${$bookingStore.get("store.store.phone")}">${StringUtils.formatPhoneNumber($bookingStore.get("store.store.phone"))}</a>
                    if you need to modify or cancel your appointment.`}>

    <Form id="login-form" class="login-form" hideFooter>
        <div class="container">
            <section>
                <label>Location</label>
                <span>{$bookingStore.get("store.address.city")}, {$bookingStore.get("store.address.state")}</span>
                <p class="address">{address}</p>
                <div class="maps">
                    <a href={`https://maps.apple.com/?address=${encodeURIComponent(address)}`} class="apple"
                       target={"_blank"} rel="noreferrer">{@html appleMapsLogo}</a>
                    <a href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`} class="google"
                       target={"_blank"} rel="noreferrer">{@html googleMapsLogo}</a>
                    <a href={`https://waze.com/ul?q=${encodeURIComponent(address)}`} class="waze"
                       target={"_blank"} rel="noreferrer">{@html wazeLogo}</a>
                </div>
            </section>
            <section>
                <label>Date & Time</label>
                <span>
                    {#if $bookingStore.get("appointment.start")}
                        {FirebaseClient.toDate($bookingStore.get("appointment.start")).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            ...($bookingStore.get("store.address.timezone") && {timeZone: $bookingStore.get("store.address.timezone")})
                        })} @ {TimeHelper.convertTime24to12($bookingStore.get("choices.timestamp"))}
                    {/if}
                </span>
            </section>
            <section>
                <label>Provider</label>
                <div class="staff__info">
                    <Avatar user={staff} size="small"/>
                    <div>
                        <span>{staff.displayName}</span>
                        <span>{staff.title}</span>
                    </div>
                </div>
            </section>
            <section>
                <label>Packages / Services</label>
                {#each selectedServices as service}
                    {service.name}
                {/each}
            </section>
        </div>
    </Form>

</BookingLayout>

<style lang="scss">

  .address {
    font-size: clamp(12px, 2vw, 16px);
  }

  .maps {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
  .google {
    margin: 0 2rem;
  }

  .address {
    overflow-x: auto;
    white-space: nowrap;
  }

  .staff__info {
    display: flex;
    align-items: center;

    > div {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;

      span {
        text-transform: capitalize;
      }

      > span:first-of-type {
        font-weight: 500;
      }

      > span:last-of-type {
        font-size: 0.6875rem;
        color: var(--fuse-text-hint);
        margin-top: 0.25rem;
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    > label {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
  }

  .container {
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
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
      > div {
        padding: 0.5rem 0.5rem;
      }
    }
  }
</style>