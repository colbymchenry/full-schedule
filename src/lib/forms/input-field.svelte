<script>
    import MaskInput from "svelte-input-mask/MaskInput.svelte";
    import {iconHelp} from "../icons.js";

    export let form_errors = {};
    export let value, label, name, type = "text", placeholder, icon, disablePrefill, readOnly, hint, info;
    export let required = false;

    let clazz;
    export {clazz as class};

    let focused = false;

    function clear_error() {
        delete form_errors[name];
        form_errors = form_errors;
    }

    // masked input fields
    export let alwaysShowMask, maskChar, mask, size, showMask;

    $: inputProps = {
        ...(disablePrefill && {autocorrect: "off"}),
        ...(disablePrefill && {spellcheck: "false"}),
        ...(disablePrefill && {autocomplete: "off"}),
        maxlength: "256",
        id: name,
        name,
        placeholder,
        type,
        required,
        "class": (icon ? "has--icon" : "")
    }

    $: readonly = readOnly ? readOnly : disablePrefill ? !focused : false;

    let showHint = false;
    let mouseX, mouseY;

    function handleMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="input-field__container">
    {#if label}
        <label for={name}>
            {label}
            {#if hint}
            <div on:mouseenter={() => showHint = true} on:mouseleave={() => showHint = false}>
                <span>{@html iconHelp}</span>
            </div>
            {/if}
        </label>
    {/if}
    <div class={"input-field" + (clazz ? " " + clazz : "")} class:is--readonly={readOnly} class:is--error={form_errors[name]} class:is--focused={focused} >
        {#if icon}
            <div class="icon">
                {@html icon}
            </div>
        {/if}
        {#if alwaysShowMask || maskChar || mask}
            <MaskInput {...inputProps} {alwaysShowMask} {maskChar} {mask} {size} {showMask} {readonly}
                       on:focus={() => focused = true} on:blur={() => focused = false}
                       on:change={clear_error} on:input={clear_error}
                       value={value || ""}
            />
        {:else}
            <input {...inputProps} {readonly} on:input={clear_error}
                   on:focusin={() => focused = true} on:focusout={() => focused = false}
                   value={value || ""}
            />
        {/if}
    </div>

    {#if info}
    <small>{info}</small>
    {/if}

    {#if form_errors[name]}
        <div class="error-message">{form_errors[name]}</div>
    {/if}
</div>

{#if hint}
    <div class="hint" class:is--visible={showHint} style={`top: ${mouseY}px;left: ${mouseX}px;`}>
        {hint}
    </div>
{/if}

<style lang="scss">
  .input-field__container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    font: 400 .875rem/1.2857142857 Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";

    small {
      margin-top: 0.25rem;
      color: rgba(var(--fuse-text-hint-rgb), );
      font-size: 13px;
    }

    label {
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--heading-color);
      display: flex;
      align-items: center;
      position: relative;
      justify-self: flex-start;

      div {
        color: var(--icon-gray);
        width: 1px;
        height: 100%;
        cursor: none;
        position: relative;

        span {
          transform: scale(0.35);
          position: absolute;
          padding: 3rem;
          margin-left: -3.7rem;
          margin-top: -4.05rem;
        }
      }
    }
  }

  .input-field {
    display: flex;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(203 213 225 / 1);
    padding: 2px 16px;
    border-radius: 6px;
    background: #fff;
    box-shadow: var(--input-box-shadow);
    position: relative;

    &.is--error {
      outline-offset: 0;
      outline: var(--error-color) solid 2px;
    }

    &.is--focused {
      outline-offset: 0;
      outline: var(--primary-color) solid 1px;
    }

    &.is--readonly {
      background-color: #DFE3E7FF;
      cursor: not-allowed;

      input {
        background-color: #DFE3E7FF;
        color: var(--fuse-text-secondary) !important;
        cursor: not-allowed;
      }
    }

    input {
      margin-bottom: 0;
      border: none;
      outline: none;
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

    .icon {
      transform: scale(0.5);
      position: absolute;
      margin-left: -1rem;
      color: var(--icon-gray);
    }
  }

  .error-message {
    margin-top: 8px;
    color: var(--error-color);
  }
</style>