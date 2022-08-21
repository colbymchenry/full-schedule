<script>
    import Footer from '$lib/forms/footer.svelte';
    import Separator from '$lib/forms/separator.svelte';

    let clazz;
    export {clazz as class};
    export let id;
    export let onSubmit;
    let reset = false;

    function prepare(e) {
        const formData = new FormData(e.target);

        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        onSubmit(data);
    }

</script>


<form {id} class={clazz || ''} on:submit|preventDefault={prepare}>
    {#key reset}
        <slot></slot>
    {/key}
    <Separator/>
    <Footer onCancel={() => { reset = !reset }}/>
</form>