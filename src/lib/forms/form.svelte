<script>
    import Footer from '$lib/forms/footer.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import {FormHelper} from "../../utils/FormHelper.js";
    import {onDestroy, onMount} from "svelte";
    import {browser} from "$app/env";

    let clazz = undefined;
    export {clazz as class};
    export let id = undefined;
    export let onSubmit = undefined;
    export let hideFooter = undefined;
    export let style = undefined;
    export let onChange = undefined;
    let reset = false;
    let footer;

    let form;

    // hold an array of listeners to close out of
    let changeListeners = [];
    let interval;

    onMount(() => {
        if (browser) {
            if (onChange && form) {
                interval = setInterval(() => {
                    Array.from(form.getElementsByTagName("INPUT"))
                        .filter((elem) => !changeListeners.includes(elem.name)) // filter out any we already have
                        .forEach((elem) => {
                            elem.addEventListener("change", onChange); // add the event listener
                            changeListeners = [...changeListeners, elem.name];
                        });
                }, 1000);

            }
        }
    })

    onDestroy(() => {
        // destroy interval
        if (browser && interval) {
            clearInterval(interval);
        }
    })
</script>


<form bind:this={form} {id} style={`${footer ? `padding-bottom: ${footer?.clientHeight}px;` : ``}${style ? ' ' + style : ''}`} class={clazz || ''}
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