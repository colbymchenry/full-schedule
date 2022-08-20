<script>
    export let gap = "1.5rem";
    export let wrap = false;
</script>

<div style={`display: grid;gap: ${gap};grid-template-columns: 1fr 1fr;grid-template-rows: 1fr;`}>
    <slot></slot>
</div>
