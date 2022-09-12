<script>
    import Footer from '$lib/drawers/footer.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Select from '$lib/forms/select.svelte';
    import CellDetails from '$lib/cell-details.svelte';
    import {iconDollar, iconPercent, iconWeight} from "../../../../lib/icons.js";
    import {showToast} from "../../../../utils/logger.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from 'firebase/firestore';
    import {ApiProgressBar} from "../../../../utils/ApiProgressBar.js";
    import {SwalHelper} from "../../../../utils/SwalHelper.js";

    export let openIndex = undefined, index = undefined, rowData = undefined, fetchProducts = undefined;
    let form_errors = {};

    async function submitProduct(formData) {
        ApiProgressBar.start()

        try {
            if (formData?.sku) {
                formData["sku"] = formData["sku"].toUpperCase().replace(/ /g,'');
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

            // have to add lower case for search functionality else where in the code
            if (formData?.name) {
                formData['name_lower'] = formData['name'].toLowerCase();
            }

            if (rowData?.doc_id) {
                await FirebaseClient.update("products", rowData.doc_id, formData);
            } else {
                await FirebaseClient.add("products", formData);
            }
            openIndex = -1;
            await fetchProducts();
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
                    await fetchProducts();
                    return;
                }

                ApiProgressBar.start()

                try {
                    await FirebaseClient.delete("products", product.doc_id);
                    openIndex = -1;
                    await fetchProducts();
                } catch (error) {
                    showToast();
                    console.error(error);
                }

                ApiProgressBar.stop()
            }
        })
    }
</script>

<CellDetails {index} bind:openIndex={openIndex}>
    <Form onSubmit={submitProduct}
          style="flex-grow: 1;max-height: 100%;overflow-y: auto;display: flex;flex-direction: column;">
        <div style="padding: 2rem;flex-grow: 1;">
            <Row>
                <div style="display: grid;grid-auto-rows: 1fr;grid-template-columns: 1fr;row-gap: 1rem;">
                    <InputField name="name" label="Name *" required value={rowData?.name} disablePrefill bind:form_errors={form_errors}/>
                    <div style="display: grid;grid-template-columns: 0.48fr 1fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <InputField name="sku" label="SKU" value={rowData?.sku} disablePrefill bind:form_errors={form_errors}/>
                        <InputField name="barcode" label="Barcode" value={rowData?.barcode} disablePrefill bind:form_errors={form_errors}/>
                    </div>

                    <div style="display: grid;grid-template-columns: 1fr 1fr 1fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <Select name="category" label="Category" value={rowData['category']} bind:form_errors={form_errors}>
                            <option value="wellness">Wellness</option>
                            <option value="aesthetics">Aesthetics</option>
                        </Select>
                        <InputField name="brand" label="Brand" value={rowData?.brand} disablePrefill bind:form_errors={form_errors}/>
                        <InputField name="vendor" label="Vendor" value={rowData?.vendor} disablePrefill bind:form_errors={form_errors}/>
                    </div>

                    <div style="display: grid;grid-template-columns: 1fr 1fr 1fr;grid-template-rows: 1fr;column-gap: 1rem;">
                        <InputField name="stock.amount" label="Stock" type="number" step="1" min="0" disablePrefill
                                    bind:form_errors={form_errors}
                                    value={rowData?.stock?.amount} hint="Leave blank for unlimited stock"/>
                        <InputField name="stock.target" label="Target Stock" type="number" step="1" min="0"
                                    disablePrefill value={rowData?.stock?.target} bind:form_errors={form_errors}
                                    hint="Receive alerts when stock is at half this number"/>
                    </div>
                </div>
                <div>
                    <Row>
                        <InputField name="cost" label="Cost" icon={iconDollar} value={rowData?.cost}
                                    disablePrefill bind:form_errors={form_errors}/>
                        <InputField name="weight" label="Weight (lbs)" icon={iconWeight} value={rowData?.weight}
                                    disablePrefill bind:form_errors={form_errors}/>
                    </Row>
                    <Row>
                        <div style="display: grid;grid-auto-rows: 1fr;grid-template-columns: 1fr;row-gap: 1rem;margin-top: 1rem;">
                            <Select name="priceType" label="Price Type" value={rowData['priceType']} bind:form_errors={form_errors}>
                                <option value="fixed">Fixed</option>
                                <option value="per_unit">Per Unit</option>
                                <option value="variable">Variable</option>
                            </Select>
                            <InputField name="tax" label="Tax" icon={iconPercent} value={rowData?.tax}
                                        disablePrefill bind:form_errors={form_errors}/>
                            <InputField name="price" label="Price" icon={iconDollar} value={rowData?.price}
                                        disablePrefill bind:form_errors={form_errors}/>
                        </div>
                    </Row>
                </div>
            </Row>

        </div>

        <div slot="footer" style="position: sticky;left: 0;bottom: 0;width: 100%;">
            <Footer hideCancel onDelete={() => deleteProduct(rowData)} isUpdate={rowData?.doc_id} style="background-color: white;"/>
        </div>
    </Form>
</CellDetails>
