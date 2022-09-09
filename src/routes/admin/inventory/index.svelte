<svelte:head>
    <title>FS • Inventory</title>
</svelte:head>

<script>
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import PaginatedList from '$lib/paginated-list.svelte';
    import CellDetails from './_components/cell-details.svelte';
    import CellStock from './_components/cell-stock.svelte';
    import {iconCheck, iconClose, iconPlus, iconSearch} from "../../../lib/icons.js";
    import {StringUtils} from "../../../utils/StringUtils.js";

    let openIndex = -1;

    let products = [];


    async function performSearch(formData) {

    }

    // used for adjusting max-height with inner content scrolling
    let header;
</script>

<div class="container full-vh">
    <div class="content">
        <div bind:this={header} class="header">
            <div>
                Inventory
            </div>

            <Form onSubmit={performSearch} class="search-form" hideFooter>
                <InputField placeholder="Search inventory" name="name" icon={iconSearch} class="br-20"/>
                <Button type="button" icon={iconPlus} callback={() => {
                    products.unshift({
                        name: "A New Product"
                    });
                    products = products;
                    setTimeout(() => {
                        openIndex = 0;
                    }, 200);
                }}>Add
                </Button>
            </Form>
        </div>
        <PaginatedList bind:data={products} table={"products"} orderBy="name,desc"
                       style={`max-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height));min-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height))`}
                       columns={{
                "SKU": {
                    key: "sku",
                    style: "text-align: center;max-width: 50px;"
                },
                "Name": {
                    key: "name",
                    style: "flex-grow: 1;width: 50%;"
                },
                "Price": {
                    key: "price"
                },
                "Stock": {
                    key: "stock.amount"
                },
                "Active": {
                    key: "active"
                },
                "Details": {
                    key: "details"
                }
        }}>
            <div slot="cell" class="truncate" let:index let:key let:data let:rowData>
                {#if key === 'details'}
                    <CellDetails bind:openIndex={openIndex} {index} {rowData} />
                {:else if key === 'stock.amount'}
                    <CellStock {index} {key} {data} {rowData}/>
                {:else if key === 'active'}
                    <div class="active" class:is--active={data}>
                        {#if data === true}
                            {@html iconCheck}
                        {:else}
                            {@html iconClose}
                        {/if}
                    </div>
                {:else if key === 'price'}
                    {!data ? "" : StringUtils.formatCurrency(data)}
                {:else}
                    {data || ""}
                {/if}
            </div>
        </PaginatedList>
    </div>
</div>

<style lang="scss">
  .active {
    transform: scale(0.4);
    color: #93a2b5;
    float: left;

    &.is--active {
      color: #54dc87;
    }
  }

  .container {
    display: flex;
    background-color: white;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: hidden;

    .content {
      flex-grow: 1;

      .header {
        padding: 2rem !important;
        display: flex;
        flex: 1 1 auto !important;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);

        > div {
          letter-spacing: -.025em !important;
          font-weight: 800 !important;
          font-size: 2rem !important;
        }
      }
    }
  }
</style>