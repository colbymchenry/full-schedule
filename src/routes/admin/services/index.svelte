<svelte:head>
    <title>FS • Services</title>
</svelte:head>

<script>
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import PaginatedList from '$lib/paginated-list.svelte';
    import CellDetails from './_components/cell-details.svelte';
    import Skeleton from 'svelte-skeleton/Skeleton.svelte'
    import {iconCheck, iconClose, iconPlus, iconSearch} from "../../../lib/icons.js";
    import {StringUtils} from "../../../utils/StringUtils.js";
    import {showToast} from "../../../utils/logger.js";
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";
    import {MathHelper} from "../../../utils/MathHelper.js";

    let openIndex = -1;

    let services = new Promise(fetchServices);

    async function fetchServices() {
        try {
            services = await FirebaseClient.collection("services");
        } catch (error) {
            showToast();
            console.error(error);
        }
    }

    async function performSearch(formData) {

    }

    // used for adjusting max-height with inner content scrolling
    let header;
</script>

<div class="container full-vh">
    <div class="content">
        <div bind:this={header} class="header">
            <div>
                Services
            </div>

            <Form onSubmit={performSearch} class="search-form" hideFooter>
                <InputField placeholder="Search services" name="name" icon={iconSearch} class="br-20"/>
                <Button type="button" icon={iconPlus} callback={() => {
                    services.unshift({
                        name: "A New Service"
                    });
                    services = services;
                    setTimeout(() => {
                        openIndex = 0;
                    }, 200);
                }}>Add
                </Button>
            </Form>
        </div>
        {#await services}
            {#each [0, 1, 2, 3, 4, 5] as number (number)}
                <Skeleton width="100%" height="75px">
                    <rect width={MathHelper.getNumberFromRange(60, 80) + "%"} height="10" x="90" y="54" rx="5" ry="5"/>
                    <rect width={MathHelper.getNumberFromRange(60, 80) + "%"} height="10" x="90" y="35" rx="5" ry="5"/>
                </Skeleton>
            {/each}
        {:then data}
            <PaginatedList data={services}
                           style={`max-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height));min-height: calc(100vh - ${header?.clientHeight || 0}px - var(--top-bar-height))`}
                           columns={{
                "Name": {
                    key: "name",
                    style: "flex-grow: 1;width: 50%;padding-left: 2rem;"
                },
                "Category": {
                    key: "category",
                    style: "flex-grow: 1;"
                },
                "Price": {
                    key: "price"
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
                        <CellDetails bind:openIndex={openIndex} {index} {rowData} {fetchServices} />
                    {:else if key === 'stock.amount'}
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
        {:catch error}

        {/await}

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