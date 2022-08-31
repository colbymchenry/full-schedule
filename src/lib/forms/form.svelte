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
    let footer;
</script>


<form {id} style={`padding-bottom: ${footer?.clientHeight}px;${style}`} class={clazz || ''}
      on:submit|preventDefault={(e) => onSubmit(FormHelper.getFormData(e.target))}>
    {#key reset}
        <slot></slot>
    {/key}
    {#if !hideFooter}
        {#if $$slots.footer}
            <slot name="footer"></slot>
        {:else}
            <div bind:this={footer}>
                <Separator/>
                <Footer onCancel={() => { reset = !reset }}/>
            </div>
        {/if}
    {/if}
</form>

<style lang="scss">
  form {
    position: relative;
  }

  div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>