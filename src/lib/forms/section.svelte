<script>
    export let title = "Title", info;
</script>

<section>
    {#if title}
        <h3 class="title">{@html title}</h3>
    {/if}
    {#if info}
        <span class="info">{@html info}</span>
    {/if}

    <div class="content">
        <slot></slot>
    </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    max-width: 48rem;

    h3 {
      margin: 0;
      font-weight: 400;
    }

    span {
      color: var(--secondary-color);
      font-size: 14px;
      margin-top: 0.25rem;
    }

    .content {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      gap: 1.5rem;
    }
  }
</style>