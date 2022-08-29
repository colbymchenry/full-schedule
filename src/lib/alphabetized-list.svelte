<script>
    export let data;
    export let key;

    const alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabet = {};

    // wait for data to populate of async
    $: if (data) {
        for (let i = 0; i < alphabetStr.length; i++) {
            let letter = alphabetStr.charAt(i);
            // find all the objects with the key starting with the letter
            alphabet[letter] = data.filter((x) => x[key].toUpperCase().startsWith(letter));
        }
    }

</script>

<section>
    {#if Object.keys(alphabet).length}
        {#each Object.keys(alphabet) as letter}
            {#if alphabet[letter].length}
                <div class="letter-block">{letter}</div>
                {#each alphabet[letter] as obj}
                    <slot data={obj}></slot>
                {/each}
            {/if}
        {/each}
    {/if}
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