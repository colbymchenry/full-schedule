<script>
    import Button from '$lib/forms/button.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Avatar from '$lib/avatar.svelte';
    import Footer from '$lib/drawers/footer.svelte';
    import {MathHelper} from "../../../../../utils/MathHelper.js";
    import {ApiProgressBar} from "../../../../../utils/ApiProgressBar.js";
    import {Api} from "../../../../../utils/Api.js";
    import {showToast} from "../../../../../utils/logger.js";
    import {iconBirthday, iconClose, iconMail, iconPhone, iconPin, iconUser} from "../../../../../lib/icons.js";
    import {FormHelper} from "../../../../../utils/FormHelper.js";
    import {SwalHelper} from "../../../../../utils/SwalHelper.js";
    import {FirebaseClient} from "../../../../../utils/firebase/FirebaseClient.js";

    export let client;
    export let onComplete, onClose;
    export let editing;

    let formElem;
    let avatarImg;
    let form_errors = {};
    let headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;

    $: if (client) {
        headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;
    }

    async function deleteClient() {
        SwalHelper.deleteConfirmation().then(async (result) => {
            if (result.isConfirmed) {
                ApiProgressBar.start();
                try {
                    await Api.post('/api/client/delete?uid=' + client?.uid);
                    await FirebaseClient.deleteFile('avatar/' + client?.uid);
                    if (onClose) onClose();
                    if (onComplete) onComplete();
                } catch (error) {
                    console.error(error)
                    showToast()
                }
                ApiProgressBar.stop();
            }
        })
    }

    async function onSubmit(data) {
        ApiProgressBar.start();
        try {
            // Grab HTML from note editor
            data.notes = document.querySelector('.ql-editor').innerHTML;

            // If there is now UID from the User create a new User, otherwise patch/update the User.
            const res = !client?.uid ? await Api.post('/api/client', data) : await Api.patch('/api/client?uid=' + client.uid, data)

            // Email exists, throw error
            if (res?.code === 'auth/email-already-exists') {
                form_errors["email"] = res.message;
                form_errors = form_errors;
                ApiProgressBar.stop();
                return;
            }

            // Phone number exists, throw error
            if (res?.code === 'auth/invalid-phone-number') {
                form_errors["phoneNumber"] = 'Invalid phone number.';
                form_errors = form_errors;
                ApiProgressBar.stop();
                return;
            }

            // If there is a new avatar image we need to upload it to Cloudinary.
            if (avatarImg) {
                // Upload image to Cloud Storage
                const photoURL = await FirebaseClient.uploadFile(avatarImg, 'avatar/' + (client?.uid || res.user.uid));
                // update Google User in the backend
                await Api.patch('/api/user', {
                    uid: client?.uid || res.user.uid,
                    photoURL
                })
                data.photoURL = photoURL;
            } else {
                data.photoURL = client.photoURL;
            }

            editing = false;
            data.uid = client?.uid || res.user.uid;
            client = data;

            if (onComplete) {
                onComplete();
            }
        } catch (error) {
            console.error(error)
            showToast()
        }
        ApiProgressBar.stop();
    }

    setTimeout(() => {
        new window.Quill('#editor', {
            theme: 'snow'
        });
    }, 100);

</script>

<div class="header">
    <img src={headerImg} loading="lazy" alt=""/>
    <Button type="button" color="icon" icon={iconClose}
            style="position: absolute;top: 2rem;right: 3rem;color: #fff;background-color: rgba(0, 0, 0, 0.5);"
            callback={onClose}/>
</div>
<div class="body">
    <div class="avatar">
        <Avatar user={client} size="large" style="outline: 4px solid white;" dontUpload
                onChange={(imgData) => avatarImg = imgData} canEdit/>
    </div>
    <div>
        <form bind:this={formElem}
              style="display: grid;grid-template-rows: 1fr;grid-template-columns: 1fr;row-gap: 2rem;">
            <InputField label="Name *" name="displayName" icon={iconUser} value={client?.displayName}
                        required disablePrefill
                        bind:form_errors={form_errors}/>

            <InputField label="Email *" type="email" name="email" icon={iconMail} value={client?.email} required
                        disablePrefill
                        bind:form_errors={form_errors}/>

            <InputField label="Phone" type="tel" name="phoneNumber" icon={iconPhone} value={client?.phoneNumber}
                        alwaysShowMask bind:form_errors={form_errors}
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />

            <InputField label="Address" name="address" icon={iconPin} value={client?.address}
                        disablePrefill bind:form_errors={form_errors}/>

            <InputField label="Birthday" name="birthday" type="date" icon={iconBirthday} value={client?.birthday}
                        disablePrefill bind:form_errors={form_errors}
            />

            <div class="notes">
                <span>Notes</span>
                <div id="editor">
                    {#if client?.notes}
                        {@html client.notes}
                    {/if}
                </div>
            </div>
        </form>
    </div>
</div>
<Footer onSave={() => onSubmit(FormHelper.getFormData(formElem))} onCancel={() => {
    if (!client?.uid) {
        onClose();
    } else {
        editing = false;
    }
}}
        onDelete={deleteClient} hideDelete={!client?.uid}/>

<style lang="scss">
  .notes > span {
    font-weight: 500;
    margin-bottom: 6px;
    color: var(--heading-color);
    font-size: 14px;
  }

  .header {
    height: 12rem;
    min-height: 12rem;
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
    flex-grow: 1;
  }

  .avatar {
    position: absolute;
    margin-top: -9rem;
  }
</style>