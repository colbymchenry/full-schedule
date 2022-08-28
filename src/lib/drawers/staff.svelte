<script>
    import Drawer from '$lib/drawer.svelte';
    import Button from '$lib/forms/button.svelte';
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import TextArea from '$lib/forms/textarea.svelte';
    import Separator from '$lib/forms/separator.svelte';
    import Footer from './footer.svelte';
    import Avatar from '$lib/avatar.svelte';
    import {iconBirthday, iconClose, iconMail, iconNotes, iconPhone, iconPin, iconUser} from "../icons.js";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {auth} from "../stores.js";
    import {Api} from "../../utils/Api.js";
    import {showToast} from "../../utils/logger.js";

    export let staff;
    let form_errors = {};
    let headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $: if (staff) {
        headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;
    }

    async function onSubmit(data) {
        ApiProgressBar.start();
        try {
            try {
                await FirebaseClient.signIn($auth.email, data["old_password"]);

                await Api.patch('/api/user', {
                    uid: $auth.uid,
                    password: data.password
                })
            } catch (error) {
                if (error?.code === 'auth/wrong-password') {
                    form_errors['old_password'] = "Wrong password."
                }

                form_errors = form_errors;
            }
        } catch (error) {
            showToast(error?.message);
        }
        ApiProgressBar.stop();
    }
</script>

<Drawer open={staff}>
    <div class="header">
        <img src={headerImg} loading="lazy" alt=""/>
        <Button type="button" color="icon" icon={iconClose}
                style="position: absolute;top: 2rem;right: 3rem;color: #fff;background-color: rgba(0, 0, 0, 0.5);"
                callback={() => staff = null}/>
    </div>
    <div class="body">
        <div class="avatar">
            <Avatar user={staff} size="large"/>
        </div>
        <div class="editor">
            <Form onSubmit={onSubmit} hideFooter
                  style="display: grid;grid-template-rows: 1fr;grid-template-columns: 1fr;row-gap: 2rem;">
                <InputField label="Name *" name="name" icon={iconUser} value={staff?.displayName}
                            required disablePrefill
                            bind:form_errors={form_errors}/>

                <InputField label="Email *" type="email" name="email" icon={iconMail} value={staff?.email} required
                            disablePrefill
                            bind:form_errors={form_errors}/>

                <InputField label="Phone" type="tel" name="phoneNumber" icon={iconPhone} value={staff?.phoneNumber}
                            alwaysShowMask
                            mask='+1 (000) 000 - 0000'
                            size={20}
                            showMask
                            maskChar="_"
                />

                <InputField label="Address" name="address" icon={iconPin} value={staff?.address}
                            disablePrefill bind:form_errors={form_errors}/>

                <InputField label="Birthday" name="birthday" icon={iconBirthday} value={staff?.birthday}
                            disablePrefill bind:form_errors={form_errors}/>

                <TextArea label="Notes" name="notes" icon={iconNotes} value={staff?.notes}
                            disablePrefill bind:form_errors={form_errors}/>

            </Form>
        </div>
    </div>
    <Footer />
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
    padding: 3rem;
    display: flex;
    flex-direction: column;

    .editor {
      margin-top: 3.5rem;
    }
  }

  .avatar {
    position: absolute;
    margin-top: -6.5rem;
  }
</style>