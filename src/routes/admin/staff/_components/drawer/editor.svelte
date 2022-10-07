<script>
    import Button from '$lib/forms/button.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Select from '$lib/forms/select.svelte';
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
    import {FormHelper} from "../../../../../utils/FormHelper.js";
    import {SwalHelper} from "../../../../../utils/SwalHelper.js";
    import {FirebaseClient} from "../../../../../utils/firebase/FirebaseClient.js";
    import _ from "lodash";
    import {TimeHelper} from "../../../../../utils/TimeHelper.js";

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
                    await Api.post('/api/staff/delete?uid=' + staff?.uid);
                    await FirebaseClient.deleteFile('avatar/' + staff?.uid);
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
                // Upload image to Cloud Storage
                const photoURL = await FirebaseClient.uploadFile(avatarImg, 'avatar/' + (staff?.uid || res.user.uid));
                let uid = staff?.uid || res.user.uid;
                // update Google User in the backend
                await Api.patch('/api/user', {
                    uid,
                    photoURL
                })
                data.photoURL = photoURL;

                if (await FirebaseClient.doc("staff", uid)) {
                    await FirebaseClient.update("staff", uid, {
                        photoURL
                    })
                }
                if (await FirebaseClient.doc("clients", uid)) {
                    await FirebaseClient.update("clients", uid, {
                        photoURL
                    })
                }
            } else {
                data.photoURL = staff.photoURL;
            }

            editing = false;

            setTimeout(() => {
                staff = _.merge(staff, data);

                if (onComplete) {
                    onComplete();
                }
            }, 200);
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

    // get an array of slider time values from 4am to 8pm
    let timeMap = [];
    for (let hour = 4; hour <= 20; hour += 0.5) timeMap.push(TimeHelper.sliderValTo24(hour));
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

            <InputField label="Birthday" name="birthday" type="date" icon={iconBirthday} value={staff?.birthday || null}
                        disablePrefill bind:form_errors={form_errors}
            />

            <label>Schedule</label>
            <div class="schedule">
                {#each ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as dayOfWeek}
                    <h5>{dayOfWeek}</h5>
                    <InputField name={`schedule.${dayOfWeek}.enabled`} type="toggle" style="padding-top: 0 !important;"
                                value={staff?.schedule ? staff?.schedule[dayOfWeek]?.enabled : null}
                                bind:form_errors={form_errors} onChange={(val) => {
                                    if (!staff?.schedule)  staff["schedule"] = {};
                                    staff["schedule"][dayOfWeek] = { enabled: val };
                                    staff = staff;
                                }}/>
                    <div>
                        <div class="time-container">

                            {#if staff?.schedule && staff?.schedule[dayOfWeek]?.enabled}
                                <InputField type="time" name={`schedule.${dayOfWeek}.day.start`} value={staff?.schedule[dayOfWeek]?.day?.start} bind:form_errors={form_errors} label="Work - Start"/>
                                <InputField type="time" name={`schedule.${dayOfWeek}.day.end`} value={staff?.schedule[dayOfWeek]?.day?.end} bind:form_errors={form_errors} label="Work - End"/>
                                <InputField type="time" name={`schedule.${dayOfWeek}.lunch.start`} value={staff?.schedule[dayOfWeek]?.lunch?.start} bind:form_errors={form_errors} label="Lunch - Start" />
                                <InputField type="time" name={`schedule.${dayOfWeek}.lunch.end`} value={staff?.schedule[dayOfWeek]?.lunch?.end} bind:form_errors={form_errors} label="Lunch - End" />
                            {:else}
                                OOO
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>

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


  .schedule {
    display: grid;
    grid-template-columns: 0.35fr 0.35fr 1fr;
    grid-auto-rows: auto;
    row-gap: 1rem;

    h5 {
      text-transform: capitalize;
    }

    .time-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      column-gap: 0.5rem;
      row-gap: 0.25rem;
      margin-top: -0.5rem;
      align-items: flex-end;
    }
  }

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