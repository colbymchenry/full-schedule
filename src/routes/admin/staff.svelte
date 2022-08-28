<script>
    import StaffDrawer from '$lib/drawers/staff.svelte';
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import AlphabetizedList from '$lib/alphabetized-list.svelte';
    import {iconSearch} from "../../lib/icons.js";
    import {onMount} from "svelte";
    import {showToast} from "../../utils/logger.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {Api} from "../../utils/Api.js";
    import {StringUtils} from "../../utils/StringUtils.js";

    let selectedStaff = null;

    let staffAccounts;

    onMount(async () => {
        try {
            let accounts = await FirebaseClient.collection("staff");

            const {users} = await Api.get(`/api/user?ids=${accounts.map(({uid}) => uid).join(",")}`);

            staffAccounts = accounts.map((account) => {
                const user = users.find(({uid}) => uid === account?.uid);
                if (user) {
                    account["displayName"] = user.displayName;
                    account["email"] = user.email;
                    account["photoURL"] = user.photoURL;
                    return account;
                }
            }).filter((account) => account !== undefined);

            console.log(staffAccounts)
        } catch (error) {
            showToast();
        }
    });

    async function onSubmit(formData) {

    }
</script>

<svelte:head>
    <title>FS • Staff</title>
</svelte:head>

<div class="container full-vh">
    <div class="content">
        <div class="header">
            <div>
                <div>
                    Staff
                </div>
                <div>
                    80 staff
                </div>
            </div>

            <Form onSubmit={onSubmit} class="search-form" hideFooter>
                <InputField placeholder="Search staff" name="name" icon={iconSearch} class="br-20"/>
                <Button type="button" callback={() => selectedStaff = {}}>Add Staff</Button>
            </Form>
        </div>

        <AlphabetizedList data={staffAccounts} key="displayName" let:data>
            <div class="staff-block">
                {#if data?.photoURL}
                    <img class="avatar" src={data.photoURL} loading="lazy" alt="" />
                {:else}
                    <div class="avatar">
                        {StringUtils.getInitials(data.displayName)}
                    </div>
                {/if}

                <div>
                    {data?.displayName}
                    {#if data?.title}<span>{data.title}</span>{/if}
                </div>
            </div>
        </AlphabetizedList>
    </div>

    <StaffDrawer bind:staff={selectedStaff}/>
</div>

<style lang="scss">
  .staff-block {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;

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
      text-transform: uppercase!important;
    }

    > div:last-of-type {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;

      > span {
        color: rgba(var(--fuse-text-secondary-rgb),var(--tw-text-opacity))!important;
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
          color: rgba(var(--fuse-text-secondary-rgb), var(--tw-text-opacity)) !important;
        }
      }
    }
  }
</style>