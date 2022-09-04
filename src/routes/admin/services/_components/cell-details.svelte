<script>
    import Footer from '$lib/drawers/footer.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Select from '$lib/forms/select.svelte';
    import CellDetails from '$lib/cell-details.svelte';
    import PaginatedList from '$lib/paginated-list.svelte';
    import SearchWithResults from '$lib/forms/search-with-results.svelte';
    import {iconDollar} from "../../../../lib/icons.js";
    import {showToast} from "../../../../utils/logger.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from 'firebase/firestore';
    import {ApiProgressBar} from "../../../../utils/ApiProgressBar.js";
    import {SwalHelper} from "../../../../utils/SwalHelper.js";

    export let openIndex, index, rowData, fetchServices;
    let form_errors = {};

    async function submitProduct(formData) {
        ApiProgressBar.start()

        try {
            if (formData?.sku) {
                formData["sku"] = formData["sku"].toUpperCase().replace(/ /g, '');
                const product = await FirebaseClient.query("products", where("sku", "==", formData["sku"].toUpperCase()));
                if (product.length) {
                    if (product[0].doc_id !== rowData?.doc_id) {
                        form_errors["sku"] = "Already used by 1 other item.";
                        form_errors = form_errors;
                        ApiProgressBar.stop();
                        return;
                    }
                }
            }

            if (rowData?.doc_id) {
                await FirebaseClient.update("products", rowData.doc_id, formData);
            } else {
                await FirebaseClient.add("products", formData);
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
                if (!product?.doc_id) {
                    openIndex = -1;
                    await fetchServices();
                    return;
                }

                ApiProgressBar.start()

                try {
                    await FirebaseClient.delete("products", product.doc_id);
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
    <Form onSubmit={submitProduct}
          style="flex-grow: 1;max-height: 100%;overflow-y: auto;display: flex;flex-direction: column;">
        <div style="padding: 2rem;flex-grow: 1;">
            <Row>
                <div style="display: grid;grid-auto-rows: 1fr;grid-template-columns: 1fr;row-gap: 1rem;">
                    <InputField name="name" label="Name *" required value={rowData?.name} disablePrefill
                                bind:form_errors={form_errors}/>
                    <div style="display: grid;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <Select name="category" label="Category *" required value={rowData['category']}
                                bind:form_errors={form_errors}>
                            <option value="wellness">Wellness</option>
                            <option value="aesthetics">Aesthetics</option>
                        </Select>
                        <InputField name="price" label="Price *" required type="number" min="0" step="1"
                                    icon={iconDollar} value={rowData?.price}
                                    disablePrefill bind:form_errors={form_errors}/>
                    </div>

                    <InputField name="more_info_url" label="More Info (URL)" value={rowData?.more_info_url}
                                disablePrefill bind:form_errors={form_errors}
                                hint="Provide a URL so a customer can get more info regarding this service."/>
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
                                if (rowData?.products) {
                                     rowData["products"] = [...rowData["products"], {
                                        name: value.name,
                                        quantity: 0
                                    }]
                                } else {
                                    rowData["products"] = [{
                                        name: value.name,
                                        quantity: 0
                                    }]
                                }
                                console.log(rowData["products"])
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
