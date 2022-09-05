<script context="module">
    export async function load({ url, params }) {
        const res = await fetch(`${url.origin}/api/booking-setup?services=true`);
        const data = await res.json();
        return {props: {services: data}}
    }
</script>

<script>
    // have to import FirebaseClient to init analytics
    import {bookingStore} from "$lib/stores.js";
    import BookingLayout from "../_components/BookingLayout.svelte";

    export let services;

    if (services && $bookingStore) {
        $bookingStore.set("services", services);
        console.log("YUR", $bookingStore);
    }
</script>

<BookingLayout title="Services" tip="What are you interested in coming in for?">

</BookingLayout>