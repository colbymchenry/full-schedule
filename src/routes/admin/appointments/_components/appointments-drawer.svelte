<script>
    import AppDrawer from '$lib/drawers/app-drawer.svelte';
    import SearchWithResults from '$lib/forms/search-with-results.svelte';
    import Form from '$lib/forms/form.svelte';
    import Avatar from '$lib/avatar.svelte';
    import Checkbox from '$lib/forms/checkbox.svelte';
    import Button from '$lib/forms/button.svelte';
    import {showToast} from "../../../../utils/logger.js";
    import {iconBirthday, iconMail, iconNotes, iconPhone, iconPin, iconPlus, iconTrash} from "../../../../lib/icons.js";
    import {FirebaseClient} from "../../../../utils/firebase/FirebaseClient.js";
    import {where} from "firebase/firestore";
    import {TimeHelper} from "../../../../utils/TimeHelper.js";
    import {Api} from "../../../../utils/Api.js";
    import {ApiProgressBar} from "../../../../utils/ApiProgressBar.js";
    import {settings} from "../../../../lib/stores.js";


    export let date = undefined, timestamp = undefined, staff = undefined, slotVisible = undefined, fetchAppointments;

    let client;
    let form_errors = {};
    let services = new Promise(fetchServices);
    let submitted = false;

    async function fetchServices() {
        try {
            services = await FirebaseClient.query("services", where("active", "==", true));
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(formData) {
        let foundError = false;

        if (!client) {
            form_errors["client"] = true;
            form_errors = form_errors;
            foundError = true;
        }

        if (!formData["services"]?.length) {
            form_errors["services"] = true;
            form_errors = form_errors;
            foundError = true;
        }

        if (foundError) return;

        ApiProgressBar.start();
        try {
            delete formData["image"];
            const [hour, minute] = timestamp.split(":");
            let payloadDate = new Date(date);
            payloadDate.setHours(parseInt(hour), parseInt(minute));
            formData["date"] = payloadDate;
            formData["staff"] = staff.doc_id;
            formData["timestamp"] = timestamp;
            const res = await Api.post('/api/appointment', formData);

            if (res?.code) {
                slotVisible = undefined;
                showToast(res?.message);
                ApiProgressBar.stop();
                return;
            }

            if (res?.appointment) {
                await fetchAppointments();
                if (res?.errors) {
                    if (res.errors.length) {
                        showToast("Appointment created!", "success", "Errors: " + res.errors.join(". "));
                    } else {
                        showToast("Appointment created!", "success");
                    }
                } else {
                    showToast("Appointment created!", "success");
                }
            }
            slotVisible = undefined;
        } catch (error) {
            showToast();
            console.error(error);
        }
        ApiProgressBar.stop();
    }
</script>

<!-- TODO: Figure out double click bug -->
<AppDrawer icon={iconPlus} onClose={() => {
    slotVisible = undefined;
}}>
    <div class="container">
        <h3>New Appointment</h3>

        <Form onSubmit={onSubmit} hideFooter style="margin-top: 1rem;" onChange={(e) => {
            delete form_errors[e.target.name];
            form_errors = form_errors;
        }}>
            <div class="form-container">
                <!-- left side -->
                <div>
                    <div class="search-container" class:error={form_errors["client"]}>
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
                                client = value;
                                delete form_errors["client"];
                                form_errors = form_errors;
                            }}>
                            <!-- When clicked we need to add the product to the service-->
                            <span class="result">
                                <Avatar user={data} size="xx-small"/>
                                <span>{data.displayName}</span>
                            </span>
                        </SearchWithResults>
                    </div>
                    {#if client}
                        <input type="hidden" value={client.doc_id} name="client"/>
                        <div class="client-info">
                            <div class="name">
                                <div>
                                    <Avatar user={client} size="small"/>
                                    <h3>{client?.displayName || "No Name"}</h3>
                                </div>
                                <Button type="button" color="delete" icon={iconTrash} isIcon
                                        callback={() => client = undefined}/>
                            </div>

                            <section class="content">
                                <div class="icon">
                                    {@html iconMail}
                                </div>
                                <div class="info">
                                    <a href={`mailto:${client?.email}`}>{client?.email}</a>
                                </div>
                                {#if client?.phoneNumber}
                                    <div class="icon">
                                        {@html iconPhone}
                                    </div>
                                    <div class="info">
                                        <a href={`tel:${client.phoneNumber}`}
                                           class="font-mono">{client.phoneNumber.replace(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, '+1 $1 $2 $3')}</a>
                                    </div>
                                {/if}
                                {#if client?.address}
                                    <div class="icon">
                                        {@html iconPin}
                                    </div>
                                    <div class="info">
                                        {client.address}
                                    </div>
                                {/if}
                                {#if client?.birthday}
                                    <div class="icon">
                                        {@html iconBirthday}
                                    </div>
                                    <div class="info">
                                        {new Date(client.birthday).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            ...($settings.get("address.timezone") && { timeZone: $settings.get("address.timezone") })
                                        })}
                                    </div>
                                {/if}
                                {#if client?.notes}
                                    <div class="icon">
                                        {@html iconNotes}
                                    </div>
                                    <div class="info">
                                        {@html client.notes}
                                    </div>
                                {/if}
                            </section>
                        </div>
                    {/if}
                </div>

                <!-- Right Side -->
                <div class="services-container" class:error={form_errors["services"]}>
                    <div>Services</div>
                    <div>
                        {#await services}
                            <p>Fetching services...</p>
                        {:then data}
                            {#each data as service}
                                <Checkbox name="services" value={service.doc_id}>{service.name}</Checkbox>
                            {/each}
                        {:catch error}
                            <p>Error fetching services...</p>
                        {/await}
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <div>
                    <span>{date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        ...($settings.get("address.timezone") && { timeZone: $settings.get("address.timezone") })
                    })} @ {TimeHelper.convertTime24to12(timestamp)} with <span style="text-transform: capitalize;">{staff?.displayName}</span></span>
                </div>
                <Button type="submit" disabled={!client} loading={submitted}>Create</Button>
            </div>
        </Form>
    </div>
</AppDrawer>


<style lang="scss">
  .error {
    color: red;
    outline: 1px solid red;
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    min-height: 22.25rem;
    max-height: 22.25rem;
    overflow-y: hidden;
    padding: 0.25rem;
  }

  .form-footer {
    background-color: rgb(248 250 252 / 1);
    color: var(--secondary-color);
    border-top: 1px solid var(--border-color);
    padding: 0 1rem;
    height: 3rem;
    margin-left: -1rem;
    margin-right: -1rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .services-container {
    border: 1px solid var(--border-color);
    min-height: 21rem;
    max-height: 21rem;
    overflow-y: auto;

    > div:first-of-type {
      background-color: rgb(248 250 252 / 1);
      color: var(--secondary-color);
      border-bottom: 1px solid var(--border-color);
      padding: 0 1rem;
      height: 2rem;
      display: flex;
      align-items: center;
    }

    > div:last-of-type {
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 2rem;
      row-gap: 0.5rem;
      overflow-y: auto;
      align-items: flex-start;
    }
  }

  .client-info {
    margin-top: 1rem;
    overflow-y: auto;
    min-height: 19rem;
    max-height: 19rem;

    .name {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;

        h3 {
          text-transform: capitalize;
          font-weight: 700;
          font-size: 1.25rem;
          margin-left: 1rem;
        }
      }
    }

    .content {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 48px auto;
      align-items: flex-start;
      padding: 0 0.5rem;
      border-top: 2px solid var(--border-color);
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