<script>
    import Footer from '$lib/forms/footer.svelte';
    import Separator from '$lib/forms/separator.svelte';

    let clazz;
    export {clazz as class};
    export let id;
    export let onSubmit;
    export let hideFooter;
    export let style;
    let reset = false;

    function setValue(object, path, value) {
        path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
        let keys = path.split('.'),
            last = keys.pop();

        keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, object)[last] = value;
    }

    let data = {};

    function prepare(e) {
        const formData = new FormData(e.target);

        let data = {};

        for (let field of formData) {
            const [key, value] = field;
            setValue(data, key, value);
        }

        onSubmit(data);
    }

</script>


<form {id} {style} class={clazz || ''} on:submit|preventDefault={prepare}>
    {#key reset}
        <slot></slot>
    {/key}
    {#if !hideFooter}
        <Separator/>
        <Footer onCancel={() => { reset = !reset }}/>
    {/if}
</form>