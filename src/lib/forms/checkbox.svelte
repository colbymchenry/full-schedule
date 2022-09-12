<script>
    export let form_errors = [];
    export let name, value, id = Math.random();
    export let required = false;
    export let onChange = undefined;
</script>

<label class="checkbox" class:is--error={form_errors[name]} for={id}>
    <input type="checkbox" {id} {name} {value} {required} on:change={onChange} />
    <span><slot></slot></span>
</label>

{#if form_errors[name]}
    <div class="error-message">{form_errors[name]}</div>
{/if}

<style lang="scss">
  .checkbox {
    display: block;
    margin-bottom: 5px;
    padding-left: 20px;
    cursor: pointer;

    &.is--error {

    }

    input {
      float: left;
      margin: 4px 0 0 -20px;
      line-height: normal;
      cursor: pointer;
      //border: 2px solid #64748b;
      //background-color: rgba(0,0,0,0);
      //transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
      //border-radius: 2px;
      //box-sizing: border-box;
      //-webkit-appearance: none;
      //-moz-appearance: none;
      //appearance: none;
      //width: 1rem;
      //height: 1rem;
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

