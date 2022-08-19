<script>
    export let form_errors = {};
    export let label, name, type = "text", placeholder;
    export let required = false;

    let focused = false;

    function clear_error() {
        delete form_errors[name];
        form_errors = form_errors;
    }
</script>

<div class="input-field__container">
    {#if label}<label for={name}>{label}</label>{/if}
    <div class="input-field" class:is--error={form_errors[name]} class:is--focused={focused}>
        <input {type} {required} on:input={clear_error} maxlength="256" {name} placeholder={placeholder} id={name}
               on:focusin={() => focused = true} on:focusout={() => focused = false}>
    </div>

    {#if form_errors[name]}
        <div class="error-message">{form_errors[name]}</div>
    {/if}
</div>

<style lang="scss">
  .input-field__container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    font: 400 .875rem/1.2857142857 Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";

    label {
      margin-bottom: 0.25rem;
    }
  }

  .input-field {
    display: flex;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-color: var(--primary-border-color);
    padding: 6px 16px;
    border-radius: 6px;

    &.is--error {
      outline-offset: 0;
      outline: var(--error-color) solid 2px;
    }

    &.is--focused {
      outline-offset: 0;
      outline: var(--primary-color) solid 1px;
    }

    input {
      margin-bottom: 0;
      border: 1px none #000;
      outline-offset: 0;
      outline: #333 none 3px;
      color: #333;
      display: block;
      width: 100%;
      height: 38px;
      line-height: 1.42857143;
      vertical-align: middle;
      background-color: #fff;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
    }
  }

  .error-message {
    margin-top: -13px;
    margin-left: 13px;
    color: var(--error-color);
  }
</style>