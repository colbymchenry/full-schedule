<script>
    import Footer from '$lib/forms/footer.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import {FormHelper} from "../../utils/FormHelper.js";

    let clazz;
    export {clazz as class};
    export let id;
    export let onSubmit;
    export let hideFooter;
    export let style;
    let reset = false;
</script>


<form {id} {style} class={clazz || ''} on:submit|preventDefault={(e) => onSubmit(FormHelper.getFormData(e.target))}>
    {#key reset}
        <slot></slot>
    {/key}
    {#if !hideFooter}
        <Separator/>
        <Footer onCancel={() => { reset = !reset }}/>
    {/if}
</form>