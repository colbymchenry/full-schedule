<svelte:head>
    <title>FS • Promotions</title>
</svelte:head>

<script>

    import {Api} from "../../utils/Api.js";
    import {ApiProgressBar} from "../../utils/ApiProgressBar.js";

    async function onSubmit() {
        ApiProgressBar.start();
        try {
            await Api.get('/api/blast');
        } catch (error) {
            console.error(error);
        }
        ApiProgressBar.stop();
    }

</script>

<button type="button" on:click={onSubmit}>Send SMS/Email BLAST</button>