<script>
    import Drawer from '$lib/drawer.svelte';
    import Button from '$lib/forms/button.svelte';
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import TextArea from '$lib/forms/textarea.svelte';
    import Footer from './footer.svelte';
    import Avatar from '$lib/avatar.svelte';
    import {iconBirthday, iconClose, iconKey, iconMail, iconNotes, iconPhone, iconPin, iconUser} from "../icons.js";
    import {ApiProgressBar} from "../ApiProgressBar.js";
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";
    import {Api} from "../../utils/Api.js";
    import {FormHelper} from "../../utils/FormHelper.js";

    export let staff;
    let formElem;
    let avatarImg;
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
        if (data["password"].length < 8) {
            form_errors["password"] = "Your new password must be at least 8 characters long.";
            form_errors = form_errors;
            return;
        }

        if (data["password"].length > 15) {
            form_errors["password"] = "Your new password must be less than 16 characters long.";
            form_errors = form_errors;
            return;
        }

        if (!data["password"].match(FirebaseClient.passwordRegex)) {
            form_errors["password"] = "Your new password must include numbers, letters and special characters.";
            form_errors = form_errors;
            return;
        }

        ApiProgressBar.start();
        try {
            const res = await Api.post('/api/staff', data);

            if (res?.code === 'auth/email-already-exists') {
                form_errors["email"] = res.message;
                form_errors = form_errors;
            }

            console.log(res)

            // const res = await Cloudinary.upload(avatarImg)
            // // update Google User in the backend
            // await Api.patch('/api/user', {
            //     uid: user.uid,
            //     photoURL: res["secure_url"]
            // })
        } catch (error) {
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
            <Avatar user={staff} size="large" onChange={(imgData) => avatarImg = imgData}/>
        </div>
        <div class="editor">
            <form bind:this={formElem}
                  style="display: grid;grid-template-rows: 1fr;grid-template-columns: 1fr;row-gap: 2rem;">
                <InputField label="Name *" name="name" icon={iconUser} value={staff?.displayName}
                            required disablePrefill
                            bind:form_errors={form_errors}/>

                <InputField label="Email *" type="email" name="email" icon={iconMail} value={staff?.email} required
                            disablePrefill
                            bind:form_errors={form_errors}/>

                <InputField label="Password *" type="password" name="password" icon={iconKey} required
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

            </form>
        </div>
    </div>
    <Footer onSave={() => onSubmit(FormHelper.getFormData(formElem))}/>
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
  }

  .avatar {
    position: absolute;
    margin-top: -9rem;
  }
</style>