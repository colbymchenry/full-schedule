<script>
    import AppDrawer from '$lib/drawers/app-drawer.svelte';
    import SearchWithResults from '$lib/forms/search-with-results.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import {iconEditCalendar} from "../../../../lib/icons.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from "firebase/firestore";

    let customer;

    async function onSubmit(formData) {

    }
</script>

<AppDrawer label="New" icon={iconEditCalendar}>
    <div class="container">
        <h3>New Appointment</h3>

        <Form onSubmit={onSubmit} hideFooter style="margin-top: 1rem;">
            <Row>
                <div class="search-container">
                    <label>Client</label>
                    <SearchWithResults let:data style="flex-grow: 1;" performSearch={async (text) => {
                                if (text) {
                                    try {
                                        // this functionality allows for searching 'startsWith' basically.
                                        const end = text.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
                                        const nameResults = await FirebaseClient.query("clients", where('displayName', '>=', text.toLowerCase()), where('displayName', '<', end.toLowerCase()));
                                        const emailResults = await FirebaseClient.query("clients", where('email', '>=', text.toLowerCase()), where('email', '<', end.toLowerCase()));
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                                return [];
                            }} onSelect={(value) => {

                            }}>
                        <!-- When clicked we need to add the product to the service-->
                        {data.name}
                    </SearchWithResults>
                </div>
            </Row>
        </Form>
    </div>
</AppDrawer>


<style lang="scss">
  .container {
    padding: 1rem;

    > h3 {
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    position: relative;

    > label {
      margin-right: 1rem;
      font-weight: 500;
    }
  }
</style>