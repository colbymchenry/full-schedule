<script>
    export let data;
    export let columns = {};
    export let style = "";
    let page = 0;
    let itemsPerPage = 10;

    $: indexStart = page * itemsPerPage;
    $: indexEnd = (page * itemsPerPage) + itemsPerPage;
</script>


<div class="paginated-list" style={style}>
    <table>
        <thead class="shadow">
        <tr>
            {#each Object.keys(columns) as column}
                <th style={columns[column]?.style}>{column}</th>
            {/each}
        </tr>

        </thead>
        <tbody>
        {#each data as data, i}
            {#if i >= indexStart && i <= indexEnd}
                <tr>
                    {#each Object.keys(columns) as column}
                        <td style={columns[column]?.style}>
                            <slot name="row" key={columns[column].key} data={data[columns[column].key]}/>
                        </td>
                    {/each}
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>

    <div class="footer-controls">

    </div>
</div>


<style lang="scss">

  .footer-controls {
    background-color: rgb(248 250 252 / 1);
    color: var(--secondary-color);
    min-height: 4.5rem;
    width: 100%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--border-color);
    position: sticky;
    bottom: 0;
    left: 0;
  }

  .paginated-list {
    position: relative;
    width: 100%;
    overflow-y: auto;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  table {
    width: 100%;
  }

  thead {
    width: 100%;
    height: 3rem;
    padding: 0 2rem;
    font-weight: 600;
    font-size: .8125rem;
    align-items: center;
    background-color: rgb(248 250 252 / 1);
    color: var(--secondary-color);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 2;

    th {
      cursor: pointer;
      text-align: left;
      padding: 0 0.55rem;
    }
  }

  tbody {
    tr {
      height: 4rem;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.55rem 0.55rem;
      font-size: 0.875rem;
    }
  }
</style>