<script>
    export let form_errors = [];
    export let id, label = "Checkbox", name = "text";
    export let required = false;
</script>

<label id={id}
       class="w-checkbox" class:is-error={form_errors[name]} for={name}>
    <input type="checkbox" class="w-checkbox-input"
           id={name}
           {name}
           {required}
    >
    <span class="w-form-label">{label}</span>
</label>

{#if form_errors[name]}
    <div class="error-message">{form_errors[name]}</div>
{/if}

