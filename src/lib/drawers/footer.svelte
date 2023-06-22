<script>
    import Button from '$lib/forms/button.svelte';
    import { auth } from '$lib/stores';

    export let onCancel, onSave, onDelete, hideDelete, hideCancel, isUpdate, style;
</script>

<div class="footer" {style}>
    {#if hideDelete}
        <div></div>
    {:else}
        <Button type="button" color="delete" callback={onDelete} disabled={$auth?.email !== import.meta.env.VITE_EMAIL}>Delete</Button>
    {/if}
    <div>
        {#if hideCancel}
            <div></div>
        {:else}
            <Button type="button" color="cancel" callback={onCancel}>Cancel</Button>
        {/if}
        <Button color="primary" callback={onSave} disabled={$auth?.email !== import.meta.env.VITE_EMAIL}>{isUpdate ? 'Update' : 'Save'}</Button>
    </div>

</div>

<style lang="scss">
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    height: 4.5rem;
    min-height: 4.5rem;
    background-color: var(--bg-color);
    border-top: 1px solid var(--border-color);
    padding: 0 1.75rem;

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
</style>