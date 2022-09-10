<script>
    import Select from '$lib/forms/select.svelte';
    import Button from '$lib/forms/button.svelte';
    import {JsonHelper} from "../utils/JsonHelper";
    import {collection, doc, getDoc, limit, orderBy, query, startAfter} from "firebase/firestore";
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";
    import {showToast} from "../utils/logger.js";
    import {onMount} from "svelte";

    export let columns = {};
    export let style = "";
    export let slim = false;
    export let table;

    export let data = [];

    let allDocs = [];
    let page = 0;
    let itemsPerPage = 10;
    let fetching = false;

    $: totalSize = allDocs.length;

    $: indexStart = page * itemsPerPage;
    $: indexEnd = indexStart + itemsPerPage;

    $: lastPage = Math.max(0, Math.ceil(totalSize / itemsPerPage) - 1);

    const iconToBeginning = `<svg viewBox="0 0 24 24" focusable="false" fill="currentColor" width="48" height="48"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></svg>`;
    const iconPageBack = `<svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" focusable="false"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`;
    const iconPageForward = `<svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" focusable="false" style="transform: rotateY(180deg);"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`;
    const iconToEnd = `<svg viewBox="0 0 24 24" focusable="false" fill="currentColor" width="48" height="48" style="transform: rotateY(180deg);"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></svg>`;

    // TODO: https://firebase.google.com/docs/firestore/query-data/query-cursors

    onMount(async () => {
        await fetchData();
    });

    async function fetchData() {
        if (!table) return;

        fetching = true;
        try {
            let ref = collection(FirebaseClient.db(), table);

            // if there is no docs pulled yet, pull them
            if (!allDocs.length) {
                allDocs = (await FirebaseClient.getSnapshot(query(ref, orderBy("name", "asc"))));
            }

            // get last document to paginate
            const docSnap = await getDoc(doc(ref, allDocs[page * itemsPerPage].doc_id));

            if (data.length) {
                data = await FirebaseClient.queryAdv(query(ref, orderBy("name", "asc"), startAfter(docSnap), limit(itemsPerPage)));
            } else {
                data = await FirebaseClient.queryAdv(query(ref, orderBy("name", "asc"), limit(itemsPerPage)));
            }
        } catch (error) {
            showToast();
            console.error(error);
        }
        fetching = false;
    }
</script>


<div class="paginated-list" {style} class:slim={slim}>
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
            <tr>
                {#each Object.keys(columns) as column}
                    <td style={columns[column]?.style}>
                        <slot name="cell" index={i} key={columns[column].key}
                              data={JsonHelper.get(data, columns[column].key)} rowData={data}/>
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>

    <div class="footer-controls">
        <div>
            Items per page:
            <Select bind:value={itemsPerPage} hideDefault small
                    style="padding-left: 0;padding-right: 0.25rem;height:24px;" onChange={() => {
                        page = 0;
                        data = [];
                        fetchData();
                    }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </Select>
        </div>

        <div>
            <span>{indexStart + 1} - {Math.min(totalSize, indexEnd + 1)} of {totalSize}</span>
        </div>

        <div>
            <Button disabled={fetching || page === 0} color="icon" icon={iconToBeginning} callback={() => {
                page = 0;
                fetchData();
            }}></Button>
            <Button disabled={fetching || page === 0} color="icon" icon={iconPageBack}
                    callback={() => {
                        page = Math.max(0, page - 1);
                          fetchData();
                    }}></Button>
            <Button disabled={fetching || page === lastPage} color="icon" icon={iconPageForward}
                    callback={() => {
                        page = Math.min(lastPage, page + 1);
                          fetchData();
                    }}></Button>
            <Button disabled={fetching || page === lastPage} color="icon" icon={iconToEnd}
                    callback={() => {
                        page = lastPage;
                          fetchData();
                    }}></Button>
        </div>
    </div>
</div>


<style lang="scss">

  .slim {
    .footer-controls {
      min-height: 2rem;
    }

    thead, tr {
      height: 3rem;
    }
  }

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
    font-size: 0.75rem;

    div {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: 2rem;
    }

    > div:last-of-type {
      gap: 0.25rem;

      span:last-of-type, span:nth-child(3) {
        transform: rotateY(180deg);
      }
    }
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
      position: relative;
    }

    td {
      padding: 0.55rem 0.55rem;
      font-size: 0.875rem;
    }
  }
</style>