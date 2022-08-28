<script>
    import Button from '$lib/forms/button.svelte';

    export let onCancel, onSave, onDelete;
</script>

<div class="footer">
    <Button type="button" color="delete" callback={onDelete}>Delete</Button>
    <div>
        <Button type="button" color="cancel" callback={onCancel}>Cancel</Button>
        <Button color="primary" callback={onSave}>Save</Button>
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