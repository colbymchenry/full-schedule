<script>
    import Drawer from '$lib/drawer.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import Avatar from '$lib/avatar.svelte';
    import Editor from './editor.svelte';
    import {iconBirthday, iconClose, iconEdit, iconMail, iconNotes, iconPhone, iconPin,} from "../../icons.js";
    import {MathHelper} from "../../../utils/MathHelper.js";

    export let client;
    export let onComplete;

    let open = false;
    let editing = false;

    $: if (client?.editing) {
        editing = true;
        delete client["editing"];
    }

    let form_errors = {};
    let headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;

    $: if (client) {
        open = true;
    }

    $: if (client) {
        headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;
    }

    function onClose() {
        open = false;
        setTimeout(() => {
            client = undefined;
            editing = false;
        }, 200);
    }
</script>

<Drawer open={open}>
    {#if !editing}
        <div class="header">
            <img src={headerImg} loading="lazy" alt=""/>
            <Button type="button" color="icon" icon={iconClose}
                    style="position: absolute;top: 2rem;right: 3rem;color: #fff;background-color: rgba(0, 0, 0, 0.5);"
                    callback={onClose}/>
        </div>
        <div class="body">
            <div class="avatar">
                <Avatar user={client} size="large" style="outline: 4px solid white;"/>
            </div>
            <div style="position: relative;">

                <div style="display: flex; align-items: center;justify-content: space-between">
                    <h1 class="truncate">{client?.displayName}</h1>
                    <Button type="button" color="secondary" icon={iconEdit} callback={() => editing = true}>Edit
                    </Button>
                </div>

                <Separator/>

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
                            <a href={`tel:${client.phoneNumber}`} class="font-mono">{client.phoneNumber.replace(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, '+1 $1 $2 $3')}</a>
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
                                day: 'numeric'
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
        </div>
    {:else}
        <Editor bind:client={client} bind:editing={editing} {onClose} {onComplete} />
    {/if}
</Drawer>

<style lang="scss">
  .header {
    height: 12rem;
    width: 100%;
    overflow: hidden;
    position: relative;


    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .body {
    padding: 5rem 3rem 3rem;
    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 700;
      font-size: 2rem;
    }

    .content {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 48px auto;
      align-items: flex-start;

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

  .avatar {
    position: absolute;
    margin-top: -9rem;
  }

  .phone {

  }
</style>