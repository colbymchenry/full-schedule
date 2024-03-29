<script>
    import Footer from '$lib/drawers/footer.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Select from '$lib/forms/select.svelte';
    import CellDetails from '$lib/cell-details.svelte';
    import PaginatedList from '$lib/paginated-list.svelte';
    import SearchWithResults from '$lib/forms/search-with-results.svelte';
    import {iconClock, iconDollar, iconHeroClock} from "../../../../lib/icons.js";
    import {showToast} from "../../../../utils/logger.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from 'firebase/firestore';
    import {ApiProgressBar} from "../../../../utils/ApiProgressBar.js";
    import {SwalHelper} from "../../../../utils/SwalHelper.js";

    export let openIndex = undefined, index = undefined, rowData = undefined, fetchServices = undefined;
    let form_errors = {};

    async function submitService(formData) {
        ApiProgressBar.start()

        try {
            if (rowData?.doc_id) {
                await FirebaseClient.update("services", rowData.doc_id, formData);
            } else {
                await FirebaseClient.add("services", formData);
            }
            openIndex = -1;
            await fetchServices();
        } catch (error) {
            showToast();
            console.error(error);
        }

        ApiProgressBar.stop()
    }

    async function deleteProduct(product) {
        SwalHelper.deleteConfirmation().then(async (result) => {
            if (result.isConfirmed) {
                // did nothing, cancelled basically
                if (!product?.doc_id) {
                    openIndex = -1;
                    await fetchServices();
                    return;
                }

                ApiProgressBar.start()

                try {
                    await FirebaseClient.delete("services", product.doc_id);
                    openIndex = -1;
                    await fetchServices();
                } catch (error) {
                    showToast();
                    console.error(error);
                }

                ApiProgressBar.stop()
            }
        })
    }
</script>

<CellDetails {index} bind:openIndex={openIndex} maxHeight="25rem">
    <Form onSubmit={submitService}
          style="flex-grow: 1;max-height: 100%;overflow-y: auto;display: flex;flex-direction: column;">
        <div style="padding: 2rem;flex-grow: 1;">
            <Row>
                <div style="display: grid;grid-auto-rows: 1fr;grid-template-columns: 1fr;row-gap: 1rem;">

                    <div style="display: grid;grid-template-columns: 1fr auto;grid-template-rows: 1fr;column-gap: 1rem;">
                        <InputField name="name" label="Name *" required value={rowData?.name} disablePrefill
                                    bind:form_errors={form_errors}/>
                        <InputField name="active" type="toggle" label="Active" value={rowData?.active}
                                    bind:form_errors={form_errors}
                        />
                    </div>
                    <div style="display: grid;grid-template-columns: 0.7fr 0.5fr 0.5fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <Select name="category" label="Category *" required value={rowData['category']}
                                bind:form_errors={form_errors}>
                            <option value="wellness">Wellness</option>
                            <option value="aesthetics">Aesthetics</option>
                        </Select>
                        <InputField name="price" label="Price *" required type="number" min="0" step="1"
                                    icon={iconDollar} value={rowData?.price}
                                    disablePrefill bind:form_errors={form_errors}/>
                        <InputField name="duration" label="Duration *" required type="number" min="0" step="1"
                                    icon={iconHeroClock} value={rowData?.duration}
                                    disablePrefill bind:form_errors={form_errors}
                                    hint="Default duration in minutes."
                        />
                    </div>

                    <div style="display: grid;grid-template-columns: 1fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <InputField name="more_info_url" label="More Info (URL)" value={rowData?.more_info_url}
                                    disablePrefill bind:form_errors={form_errors}
                                    hint="Provide a URL so a customer can get more info regarding this service."/>
                    </div>
                </div>
                <div>
                    <div class="multi-select">
                        <div style="display: flex;align-items: center;margin-bottom: 0.5rem;position: relative;">
                            <label>Products Required</label>
                            <SearchWithResults let:data style="flex-grow: 1;" performSearch={async (text) => {
                                if (text) {
                                    try {
                                        // this functionality allows for searching 'startsWith' basically.
                                        const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
                                        return await FirebaseClient.query("products", where('name_lower', '>=', text.toLowerCase()), where('name_lower', '<', end.toLowerCase()));
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                                return [];
                            }} onSelect={(value) => {
                                // check if the service has any products already
                                if (rowData?.products) {
                                    // add the product at quantity 1 to the products array
                                     rowData["products"] = [...rowData["products"], {
                                        name: value.name,
                                        doc_id: value.doc_id,
                                        quantity: 1
                                    }]
                                } else {
                                    // add the product at quantity 1 and initialize the product array
                                    rowData["products"] = [{
                                        name: value.name,
                                        doc_id: value.doc_id,
                                        quantity: 1
                                    }]
                                }
                            }}>
                                <!-- When clicked we need to add the product to the service-->
                                {data.name}
                            </SearchWithResults>
                        </div>
                        <PaginatedList data={rowData["products"] || []} slim
                                       style={`flex-grow: 1;border: 1px solid var(--border-color);max-height: 13.5rem;`}
                                       columns={{
                                                "Product": {
                                                    key: "name",
                                                    style: "flex-grow: 1;width: 80%;padding-left: 2rem;"
                                                },
                                                "Quantity": {
                                                    key: "category"
                                                }
                                }}>
                            <div slot="cell" class="truncate" let:index let:key let:data let:rowData>
                                {data || ""}
                            </div>
                        </PaginatedList>
                    </div>
                </div>
            </Row>

        </div>

        <div slot="footer" style="position: sticky;left: 0;bottom: 0;width: 100%;">
            <Footer hideCancel onDelete={() => deleteProduct(rowData)} isUpdate={rowData?.doc_id}
                    style="background-color: white;"/>
        </div>
    </Form>
</CellDetails>

<style lang="scss">
  .multi-select {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    label {
      font-weight: 500;
      margin-right: 1rem;
    }
  }
</style>
