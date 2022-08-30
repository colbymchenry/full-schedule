<svelte:head>
    <title>FS • Inventory</title>
</svelte:head>

<script>
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import PaginatedList from '$lib/paginated-list.svelte';
    import {iconPlus, iconSearch} from "../../../lib/icons.js";
    import {MathHelper} from "../../../utils/MathHelper.js";
    import {StringUtils} from "../../../utils/StringUtils.js";

    const products = [];

    for (let i = 0; i < MathHelper.getNumberFromRange(50, 100); i++) {
        products.push({
            id: 1,
            name: 'Epithalon ' + i,
            price: MathHelper.getNumberFromRange(3000, 30000),
            cost: MathHelper.getNumberFromRange(1000, 2000),
            sku: 'ADH-' + MathHelper.getNumberFromRange(1000, 9000),
            category: 'wellness',
            active: false,
            stock: MathHelper.getNumberFromRange(1, 300),
            priceType: 'unit'
        })
    }

    async function performSearch(formData) {

    }

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
                <Button type="button" icon={iconPlus}>Add</Button>
            </Form>
        </div>
        <PaginatedList data={products}
                       style={`max-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height));min-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height))`}
                       columns={{
                "SKU": {
                    key: "sku",
                    style: "text-align: center;"
                },
                "Name": {
                    key: "name",
                    style: "flex-grow: 1;width: 50%;"
                },
                "Price": {
                    key: "price"
                },
                "Stock": {
                    key: "stock"
                },
                "Active": {
                    key: "active"
                },
                "Details": {
                    key: "details"
                }
        }}>
            <div slot="row" let:key let:data>
                {#if key === 'details'}

                {:else if key === 'stock'}
                {:else if key === 'active'}
                {:else if key === 'price'}
                    {StringUtils.formatCurrency(data / 100)}
                {:else}
                    {data}
                {/if}
            </div>
        </PaginatedList>
    </div>
</div>

<style lang="scss">

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