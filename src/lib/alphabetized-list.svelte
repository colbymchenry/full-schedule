<script>

    const alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabet = [];
    for (let i = 0; i < alphabetStr.length; i++) {
        alphabet.push(alphabetStr.charAt(i));
    }

</script>

<section>
    {#each alphabet as letter}
        <div class="letter-block">{letter}</div>
    {/each}
</section>


<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
  }

  .letter-block {
    width: 100%;
    padding: 0.25rem 2rem !important;
    color: rgba(var(--fuse-text-secondary-rgb), 1) !important;
    border-color: rgba(var(--fuse-border-rgb), 1);
    border-top-width: 1px !important;
    border-bottom-width: 1px !important;
    background-color: rgb(248 250 252 /1) !important;
    border-style: solid;
  }
</style>