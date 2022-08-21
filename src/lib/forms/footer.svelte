<script>
    import Button from './button.svelte';
</script>

<div>
    <Button type="button" color="secondary">Cancel</Button>
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