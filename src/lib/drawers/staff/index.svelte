<script>
    import Drawer from '$lib/drawer.svelte';
    import Button from '$lib/forms/button.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import Avatar from '$lib/avatar.svelte';
    import Editor from './editor.svelte';
    import {
        iconBirthday,
        iconBriefcase,
        iconClose, iconEdit,
        iconMail,
        iconNotes,
        iconPhone,
        iconPin,
    } from "../../icons.js";

    export let staff;
    export let onComplete;

    let open = false;
    let editing = false;
    let form_errors = {};
    let headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;

    $: if (staff) {
        open = true;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $: if (staff) {
        headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;
    }

    function onClose() {
        open = false;
        setTimeout(() => {
            staff = undefined;
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
                <Avatar user={staff} size="large" style="outline: 4px solid white;"/>
            </div>
            <div style="position: relative;">

                <div style="display: flex; align-items: center;justify-content: space-between">
                    <h1 class="truncate">{staff?.displayName}</h1>
                    <Button type="button" color="secondary" icon={iconEdit} callback={() => editing = true}>Edit
                    </Button>
                </div>

                <Separator/>

                <section class="content">
                    <div class="icon">
                        {@html iconBriefcase}
                    </div>
                    <div class="info">
                        {staff?.title}
                    </div>
                    <div class="icon">
                        {@html iconMail}
                    </div>
                    <div class="info">
                        <a href={`mailto:${staff?.email}`}>{staff?.email}</a>
                    </div>
                    {#if staff?.phoneNumber}
                        <div class="icon">
                            {@html iconPhone}
                        </div>
                        <div class="info">
                            <a href={`tel:${staff?.phoneNumber}`}>{staff?.phoneNumber}</a>
                        </div>
                    {/if}
                    {#if staff?.address}
                        <div class="icon">
                            {@html iconPin}
                        </div>
                        <div class="info">
                            {staff?.address}
                        </div>
                    {/if}
                    {#if staff?.birthday}
                        <div class="icon">
                            {@html iconBirthday}
                        </div>
                        <div class="info">
                            {staff?.birthday}
                        </div>
                    {/if}
                    {#if staff?.notes}
                        <div class="icon">
                            {@html iconNotes}
                        </div>
                        <div class="info">
                            {staff?.notes}
                        </div>
                    {/if}
                </section>
            </div>
        </div>
    {:else}
        <Editor bind:staff={staff} bind:editing={editing} {onClose} {onComplete} />
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
      align-items: center;

      .icon {
        color: #63738a;
        transform: scale(0.5);
        margin-left: -1rem;
      }

      .info {
        line-height: 1.5rem;
        font-size: 14px;
      }
    }
  }

  .avatar {
    position: absolute;
    margin-top: -9rem;
  }
</style>