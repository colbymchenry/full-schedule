<svelte:head>
    <title>FS • Clients</title>
</svelte:head>

<script>
    import ClientDrawer from '$lib/drawers/client/index.svelte';
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import AlphabetizedList from '$lib/alphabetized-list.svelte';
    import {iconSearch} from "../../lib/icons.js";
    import {showToast} from "../../utils/logger.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {Api} from "../../utils/Api.js";
    import {StringUtils} from "../../utils/StringUtils.js";
    import Skeleton from 'svelte-skeleton/Skeleton.svelte'
    import {MathHelper} from "../../utils/MathHelper.js";

    let selectedClient = null;

    let clientAccounts = new Promise(fetchClients);

    async function fetchClients() {
        try {
            let accounts = await FirebaseClient.collection("clients");

            if (!accounts.map(({uid}) => uid).join(",").length) {
                clientAccounts = [];
                return;
            }

            const {users} = await Api.get(`/api/user?ids=${accounts.map(({uid}) => uid).join(",")}`);

            clientAccounts = accounts.map((account) => {
                const user = users.find(({uid}) => uid === account?.uid);
                if (user) {
                    account["displayName"] = user.displayName;
                    account["email"] = user.email;
                    account["photoURL"] = user.photoURL;
                    account["phoneNumber"] = user.phoneNumber;
                    return account;
                }
            }).filter((account) => account !== undefined);

            return clientAccounts;
        } catch (error) {
            showToast();
        }
    }

    async function performSearch(formData) {

    }
</script>

<div class="container full-vh">
    <div class="content">
        <div class="header">
            <div>
                <div>
                    Clients
                </div>
                <div>
                    {#await clientAccounts}
                        Fetching...
                    {:then data}
                        {clientAccounts.length + " clients"}
                    {:catch error}
                    {/await}
                </div>
            </div>

            <Form onSubmit={performSearch} class="search-form" hideFooter>
                <InputField placeholder="Search client" name="name" icon={iconSearch} class="br-20"/>
                <Button type="button" callback={() => selectedClient = {editing: true}}>Add Client</Button>
            </Form>
        </div>

        {#await clientAccounts}
            <!-- promise is pending -->
            <div style="max-width: 500px;">
                {#each [0, 1, 2, 3, 4, 5] as number (number)}
                    <Skeleton width="100%" height="75px">
                        <circle cx="50" cy="50" r="24" stroke="black"/>
                        <rect width={MathHelper.getNumberFromRange(100, 280)} height="10" x="90" y="54" rx="5" ry="5"/>
                        <rect width={MathHelper.getNumberFromRange(100, 280)} height="10" x="90" y="35" rx="5" ry="5"/>
                    </Skeleton>
                {/each}
            </div>
        {:then value}
            <AlphabetizedList data={clientAccounts} key="displayName" let:data>
                <div class="client-block" on:click={() => selectedClient = data}>
                    {#if data?.photoURL}
                        <img class="avatar" src={data.photoURL} loading="lazy" alt=""/>
                    {:else}
                        <div class="avatar">
                            {StringUtils.getInitials(data.displayName)}
                        </div>
                    {/if}

                    <div>
                        {data?.displayName}
                    </div>
                </div>
            </AlphabetizedList>
        {:catch error}
        {/await}
    </div>

    <ClientDrawer bind:client={selectedClient} onComplete={async () => {
        await fetchClients();
    }}/>
</div>

<style lang="scss">
  .client-block {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid var(--border-color);

    &:hover {
      background-color: #eff3f7;
    }

    .avatar {
      object-fit: cover;
      border-radius: 9999px;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e0e6ee;
      color: #475569;
      text-transform: uppercase !important;
    }

    > div:last-of-type {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;

      > span {
        color: rgba(var(--fuse-text-secondary-rgb), var(--tw-text-opacity)) !important;
      }
    }
  }

  .container {
    display: flex;
    background-color: white;
    overflow-x: hidden;
    overflow-y: auto;

    .content {
      flex-grow: 1;


      .header {
        padding: 2rem !important;
        flex-direction: column !important;
        display: flex;
        flex: 1 1 auto !important;
        border-bottom: 1px solid var(--border-color);

        > div {
          margin-bottom: 1rem;
        }

        > div > div:first-of-type {
          letter-spacing: -.025em !important;
          line-height: 1 !important;
          font-weight: 800 !important;
          font-size: 2rem !important;
        }

        > div > div:last-of-type {
          font-weight: 500 !important;
          margin-left: 0.125rem !important;
          font-size: 14px;
          color: rgba(var(--fuse-text-secondary-rgb), var(--tw-text-opacity)) !important;
        }
      }
    }
  }
</style>