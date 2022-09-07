<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
</svelte:head>

<script>
    import InputField from '$lib/forms/input-field.svelte';
    import Row from '$lib/forms/row.svelte';
    import Form from '$lib/forms/form.svelte';
    import Section from '$lib/forms/section.svelte';
    import {showToast} from "../../../utils/logger.js";
    import {iconMail, iconPhone, iconUsers} from "../../../lib/icons.js";
    import {auth} from "../../../lib/stores.js";
    import {Api} from "../../../utils/Api.js";
    import {ApiProgressBar} from "../../../utils/ApiProgressBar.js";
    import {FirebaseClient} from "../../../utils/firebase/FirebaseClient.js";

    let form_errors = {};

    async function onSubmit(data) {
        ApiProgressBar.start();
        try {
            // update Google User in the backend
            await Api.patch('/api/user', {
                uid: $auth.uid,
                displayName: data.name,
                phoneNumber: data.phone
            })
        } catch (error) {
            showToast(error?.message);
        }

        ApiProgressBar.stop();
    }

    async function readCsv(files) {
        const file = files[0];
        const reader = new FileReader();

        // 👇 executed when a file is loaded
        reader.onload = async function (e) {
            // 👇 get the text from CSV file
            const text = e.target.result;

            // 👇 parse it using D3.js
            const data = d3.csvParse(text);

            ApiProgressBar.start()
            await Promise.all(data.map(async (client) => {
                const submitData = {
                    ...(client["Address Line 1"] && client["City"] && client["State"] && {address: client["Address Line 1"] + " " + client["Address Line 2"] + ", " + client["City"] + ", " + client["State"] + " " + client["Postal Code"]}),
                    birthday: client["DOB"],
                    displayName: client["First name"]?.toLowerCase() + " " + client["Last name"]?.toLowerCase(),
                    email: client["Email address"]?.toLowerCase(),
                    phoneNumber: "+1" + client["Mobile Phone"].replace('+1', '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ''),
                    sex: client["Sex"]
                }
                await FirebaseClient.add("clients", submitData);
            }));
            ApiProgressBar.stop()
        };

        // 👇 load the input file to the reader
        reader.readAsText(file);
    }

</script>


<Form onSubmit={onSubmit}>
    <Section title="Importing" info="Please review the sample data carefully before submitting the imported data!">
        <Row>
            <InputField label="Customer CSV" type="file" name="customer_csv" icon={iconUsers}
                        hint="Server administrator access only."
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={readCsv}
            />
        </Row>
    </Section>
</Form>