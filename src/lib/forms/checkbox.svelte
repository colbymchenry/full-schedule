<script>
    export let form_errors = [];
    export let label = "Checkbox", name = "text";
    export let required = false;
</script>

<label class="checkbox" class:is--error={form_errors[name]} for={name}>
    <input type="checkbox" id={name} {name} {required}/>
    <span>{label}</span>
</label>

{#if form_errors[name]}
    <div class="error-message">{form_errors[name]}</div>
{/if}

<style lang="scss">
  .checkbox {
    display: block;
    margin-bottom: 5px;
    padding-left: 20px;

    &.is--error {

    }

    input {
      float: left;
      margin: 4px 0 0 -20px;
      line-height: normal;
    }

    span {
      display: inline-block;
      cursor: pointer;
      font-weight: normal;
      margin-bottom: 0;
    }
  }

  .error-message {
    margin-top: -13px;
    margin-left: 13px;
    color: var(--error-color);
  }
</style>

