<script>
    export let form_errors = {};
    export let name, type = "text", placeholder;
    export let required = false;

    function clear_error() {
        delete form_errors[name];
        form_errors = form_errors;
    }
</script>

<div class="inputfield is--boxed" class:is-error={form_errors[name]}>
    <input {type} {required} on:input={clear_error} class="inputfield__input w-input"
           maxlength="256" {name} placeholder={placeholder} id={name} >
</div>

{#if form_errors[name]}
    <div class="error-message">{form_errors[name]}</div>
{/if}