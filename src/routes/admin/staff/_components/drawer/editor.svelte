<script>
    import Button from '$lib/forms/button.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Footer from '$lib/drawers/footer.svelte';
    import Avatar from '$lib/avatar.svelte';
    import {
        iconBirthday,
        iconBriefcase,
        iconClose,
        iconKey,
        iconMail,
        iconPhone,
        iconPin,
        iconUser
    } from '$lib/icons.js';
    import {MathHelper} from "../../../../../utils/MathHelper.js";
    import {ApiProgressBar} from "../../../../../utils/ApiProgressBar.js";
    import {Api} from "../../../../../utils/Api.js";
    import {showToast} from "../../../../../utils/logger.js";
    import {CloudinaryApi} from "../../../../../utils/CloudinaryApi.js";
    import {FormHelper} from "../../../../../utils/FormHelper.js";
    import {SwalHelper} from "../../../../../utils/SwalHelper.js";

    export let staff;
    export let onComplete, onClose;
    export let editing;

    let formElem;
    let avatarImg;
    let form_errors = {};
    let headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;

    $: if (staff) {
        headerImg = `/images/cover${MathHelper.getNumberFromRange(1, 10)}.jpg`;
    }

    async function deleteStaff() {
        SwalHelper.deleteConfirmation().then(async (result) => {
            if (result.isConfirmed) {
                ApiProgressBar.start();
                try {
                    const res = await Api.post('/api/staff/delete?uid=' + staff?.uid);
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
        if (!staff || !Object.keys(staff).length) {
            if (!data["password"] || !data["password"].length) {
                form_errors["password"] = "A password is required.";
                form_errors = form_errors;
                return;
            }

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
        }

        ApiProgressBar.start();
        try {
            data.notes = document.querySelector('.ql-editor').innerHTML;
            const res = !staff.uid ? await Api.post('/api/staff', data) : await Api.patch('/api/staff?uid=' + staff.uid, data)

            if (res?.code === 'auth/email-already-exists') {
                form_errors["email"] = res.message;
                form_errors = form_errors;
                ApiProgressBar.stop();
                return;
            }

            if (res?.code === 'auth/invalid-phone-number') {
                form_errors["phoneNumber"] = 'Invalid phone number.';
                form_errors = form_errors;
                ApiProgressBar.stop();
                return;
            }

            if (avatarImg) {
                const resCloudinary = await CloudinaryApi.upload(avatarImg)
                // update Google User in the backend
                await Api.patch('/api/user', {
                    uid: staff?.uid || res.user.uid,
                    photoURL: resCloudinary["secure_url"]
                })
                data.photoURL = resCloudinary["secure_url"];
            } else {
                data.photoURL = staff.photoURL;
            }

            editing = false;
            data.uid = staff?.uid || res.user.uid;
            staff = data;

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
        <Avatar user={staff} size="large" style="outline: 4px solid white;" dontUpload
                onChange={(imgData) => avatarImg = imgData} canEdit/>
    </div>
    <div>
        <form bind:this={formElem}
              style="display: grid;grid-template-rows: 1fr;grid-template-columns: 1fr;row-gap: 2rem;">
            <InputField label="Name *" name="displayName" icon={iconUser} value={staff?.displayName}
                        required disablePrefill
                        bind:form_errors={form_errors}/>

            <InputField label="Title" name="title" icon={iconBriefcase} value={staff?.title}
                        disablePrefill bind:form_errors={form_errors}/>

            <InputField label="Email *" type="email" name="email" icon={iconMail} value={staff?.email} required
                        disablePrefill
                        bind:form_errors={form_errors}/>

            {#if !staff || !Object.keys(staff).length}
                <InputField label="Password *" type="password" name="password" icon={iconKey} required
                            bind:form_errors={form_errors}/>
            {/if}

            <InputField label="Phone" type="tel" name="phoneNumber" icon={iconPhone} value={staff?.phoneNumber}
                        alwaysShowMask bind:form_errors={form_errors}
                        mask='+1 (000) 000 - 0000'
                        size={20}
                        showMask
                        maskChar="_"
            />

            <InputField label="Address" name="address" icon={iconPin} value={staff?.address}
                        disablePrefill bind:form_errors={form_errors}/>

            <InputField label="Birthday" name="birthday" type="date" icon={iconBirthday} value={staff?.birthday}
                        disablePrefill bind:form_errors={form_errors}
            />

            <div class="notes">
                <span>Notes</span>
                <div id="editor">
                    {#if staff?.notes}
                        {@html staff.notes}
                    {/if}
                </div>
            </div>
        </form>
    </div>
</div>
<Footer onSave={() => onSubmit(FormHelper.getFormData(formElem))} onCancel={() => {
    if (!staff?.uid) {
        onClose();
    } else {
        editing = false;
    }
}}
        onDelete={deleteStaff} hideDelete={!staff?.uid}/>

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