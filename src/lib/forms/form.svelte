<script>

    export let className;
    export let onSubmit;

    function prepare(e) {
        const formData = new FormData(e.target);

        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        onSubmit(data);
    }

</script>

<form class={className} on:submit|preventDefault={prepare}>
   <slot></slot>
</form>