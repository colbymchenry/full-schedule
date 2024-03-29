<script>
    import {iconPhotoLibrary} from "./icons.js";
    import Swal from "sweetalert2";
    import {Api} from "../utils/Api.js";
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";
    import {StringUtils} from "../utils/StringUtils.js";

    export let user = undefined;
    export let src = undefined;
    export let size = undefined;
    export let onChange = undefined;
    export let style = undefined;
    export let dontUpload = false
    export let canEdit = false;
    export let square = false;

    $: photoSrc = src || user?.photoURL;

    let newSrc;

    let clazz = undefined;
    export {clazz as class};

    let input;
    let files;
    let uploading = false;

    function openFileDrawer() {
        if (canEdit)
            input.click();
    }

    async function uploadImage() {
        // check if there are any files selected
        if (files.length) {
            // if no user is provided to the Avatar component the file uploading is disabled
            if (!user && !dontUpload) {
                await Swal.fire({
                    title: 'User not found.',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            const megabytes = (files[0].size / 1024) / 1024;
            // check if file is over 10MB
            if (megabytes > 10) {
                await Swal.fire({
                    title: 'File too large',
                    html: `Your file is <b>${megabytes.toFixed(2)}Mb</b>. The max file size is <b>10Mb</b>.`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            // read the uploaded file and set the source to the new file
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                newSrc = reader.result;
            });
            reader.readAsDataURL(files[0]);

            if (onChange) {
                onChange(files[0]);
            }

            if (dontUpload) return;

            // set uploading to true so z-index of avatar is above SweetAlert
            uploading = true;
            const keep = await Swal.fire({
                icon: 'question',
                confirmButtonText: 'Keep it',
                denyButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                backdrop: true,
                showDenyButton: () => !Swal.isLoading(),
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: async () => {
                    try {
                        // Upload image to Cloud Storage
                        const res = await FirebaseClient.uploadFile(files[0], 'avatar/' + user.uid);
                        // update Google User in the backend
                        await Api.patch('/api/user', {
                            uid: user.uid,
                            photoURL: res
                        });

                        if (await FirebaseClient.doc("staff", user.uid)) {
                            await FirebaseClient.update("staff", user.uid, {
                                photoURL: res
                            })
                        } else if (await FirebaseClient.doc("clients", user.uid)) {
                            await FirebaseClient.update("clients", user.uid, {
                                photoURL: res
                            })
                        }
                    } catch (error) {
                        await Swal.fire({
                            title: 'Error Reported',
                            text: 'A Full Schedule helper has been contacted.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });

                        newSrc = undefined;
                    }
                }
            });

            uploading = false;

            if (keep.isDenied) {
                newSrc = undefined;
            }
        }
    }
</script>

<div class={`avatar ${clazz || ''} ${size || 'small'} ${uploading ? 'uploading' : ''}`} class:is--square={square}>
    <div on:click={openFileDrawer} class:canEdit={canEdit}
         style={files?.length || photoSrc ? "background-color: transparent !important;border: none !important;" : ""}>
        {#if photoSrc || newSrc}
            <img {style} src={newSrc || photoSrc} loading="lazy" alt="">
        {:else if !canEdit}
            <span>{StringUtils.getInitials(user?.displayName)}</span>
        {:else}
            {@html iconPhotoLibrary}
        {/if}

        <input bind:this={input} bind:files={files} on:change={uploadImage} type="file" accept="image/*"
               name="image" alt=""/>
    </div>
</div>

<style lang="scss">

  .avatar {
    span {
      font-size: 0.8rem;
    }

    img, div {
      border-radius: 100%;
      object-fit: cover;
    }

    &.is--square {
      img, div {
        border-radius: unset;
      }
    }

    // 1062 is SweetAlerts z-index
    &.uploading {
      z-index: 1066;
    }

    &.xxx-small img, &.xxx-small div {
      width: 16px;
      height: 16px;
    }

    &.xx-small img, &.xx-small div {
      width: 24px;
      height: 24px;
    }

    &.x-small img, &.x-small div {
      width: 32px;
      height: 32px;
    }

    &.small img, &.small div {
      width: 48px;
      height: 48px;
    }

    &.normal img, &.normal div {
      width: 62px;
      height: 62px;
    }

    &.medium img, &.medium div {
      width: 96px;
      height: 96px;
    }

    &.large img, &.large div {
      width: 120px;
      height: 120px;
    }

    div {
      background-color: #29303b;
      color: #9ea1a7;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease;

      &.canEdit:hover {
        cursor: pointer;
        scale: 1.1;
        background-color: #9ea1a7;
        color: #29303b;
      }

      input {
        display: none;
      }
    }
  }


</style>