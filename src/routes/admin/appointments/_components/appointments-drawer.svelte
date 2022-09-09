<script>
    import AppDrawer from '$lib/drawers/app-drawer.svelte';
    import SearchWithResults from '$lib/forms/search-with-results.svelte';
    import Form from '$lib/forms/form.svelte';
    import Row from '$lib/forms/row.svelte';
    import Avatar from '$lib/avatar.svelte';
    import {iconBirthday, iconMail, iconNotes, iconPhone, iconPin, iconPlus} from "../../../../lib/icons.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from "firebase/firestore";

    export let date, onClose, slotVisible;
    let customer;

    async function onSubmit(formData) {

    }
</script>

<!-- TODO: Figure out double click bug -->
<AppDrawer icon={iconPlus} onClose={() => {
    slotVisible = undefined;
}}>
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

                                        if (text.includes("@")) {
                                            return await FirebaseClient.query("clients", where('email', '>=', text.toLowerCase()), where('email', '<', end.toLowerCase()));
                                        } else {
                                            return await FirebaseClient.query("clients", where('displayName', '>=', text.toLowerCase()), where('displayName', '<', end.toLowerCase()));
                                        }

                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                                return [];
                            }} onSelect={(value) => {
                                customer = value;
                            }}>
                        <!-- When clicked we need to add the product to the service-->
                        <span class="result">
                            <Avatar user={data} size="xx-small"/>
                            <span>{data.displayName}</span>
                        </span>
                    </SearchWithResults>
                </div>
            </Row>

            <Row>
                {#if customer}
                    <div class="customer-info">
                        <div class="name">
                            <Avatar user={customer} size="small"/>
                            <h3>{customer?.displayName || "No Name"}</h3>
                        </div>

                        <section class="content">
                            <div class="icon">
                                {@html iconMail}
                            </div>
                            <div class="info">
                                <a href={`mailto:${customer?.email}`}>{customer?.email}</a>
                            </div>
                            {#if customer?.phoneNumber}
                                <div class="icon">
                                    {@html iconPhone}
                                </div>
                                <div class="info">
                                    <a href={`tel:${customer.phoneNumber}`} class="font-mono">{customer.phoneNumber.replace(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, '+1 $1 $2 $3')}</a>
                                </div>
                            {/if}
                            {#if customer?.address}
                                <div class="icon">
                                    {@html iconPin}
                                </div>
                                <div class="info">
                                    {customer.address}
                                </div>
                            {/if}
                            {#if customer?.birthday}
                                <div class="icon">
                                    {@html iconBirthday}
                                </div>
                                <div class="info">
                                    {new Date(customer.birthday).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            {/if}
                            {#if customer?.notes}
                                <div class="icon">
                                    {@html iconNotes}
                                </div>
                                <div class="info">
                                    {@html customer.notes}
                                </div>
                            {/if}
                        </section>
                    </div>
                {/if}
            </Row>
            <br/>
        </Form>
    </div>
</AppDrawer>


<style lang="scss">




  .customer-info {
    .name {
      display: flex;
      align-items: center;

      h3 {
        text-transform: capitalize;
        font-weight: 700;
        font-size: 1.25rem;
        margin-left: 1rem;
      }
    }

    .content {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 48px auto;
      align-items: flex-start;
      padding: 0 0.5rem;
      border-top: 1px solid var(--border-color);
      margin-top: 1rem;

      .icon {
        color: #63738a;
        transform: scale(0.5);
        margin-left: -1rem;
      }

      .info {
        line-height: 1.5rem;
        font-size: 14px;
        margin-top: 0.8rem;
      }
    }
  }

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

    .result {
      text-transform: capitalize;
      display: flex;
      align-items: center;
      height: 24px;
      max-height: 24px;
      min-height: 24px;

      span {
        margin-left: 0.5rem;
      }
    }
  }
</style>