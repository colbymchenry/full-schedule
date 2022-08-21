<script>
    import Button from './button.svelte';

    export let onCancel;
</script>

<div>
    <Button type="button" color="secondary" callback={onCancel}>Cancel</Button>
    <Button color="primary">Save</Button>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        gap: 1rem;
    }
</style>