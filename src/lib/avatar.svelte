<script>
    import {iconPhotoLibrary} from "./icons.js";
    import Swal from "sweetalert2";
    import {Api} from "../utils/Api.js";
    import {FirebaseClient} from "../utils/firebase/FirebaseClient.js";

    export let user;
    export let size;

    $: src = user?.photoURL;

    let newSrc;

    let clazz;
    export {clazz as class};

    let input;
    let files;
    let uploading = false;

    function openFileDrawer() {
        input.click();
    }

    async function uploadImage() {
        // check if there are any files selected
        if (files.length) {
            // if no user is provided to the Avatar component the file uploading is disabled
            if (!user) {
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
                        // upload image to cloudinary
                        const formData = new FormData();
                        formData.append('file', files[0])
                        formData.append('upload_preset', 'my-uploads')
                        const imgUpload = await fetch('https://api.cloudinary.com/v1_1/dfpldejtd/image/upload', {
                            method: 'POST',
                            body: formData
                        })
                        const res = await imgUpload.json();
                        // update Google User in the backend
                        await Api.patch('/api/user', {
                            uid: user.uid,
                            photoURL: res["secure_url"]
                        })
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

<div class={`avatar ${clazz || ''} ${size || 'small'} ${uploading ? 'uploading' : ''}`}>
    <div on:click={openFileDrawer}>
        {#if src || newSrc}
            <img src={newSrc || src} loading="lazy" alt="">
        {:else}
            {@html iconPhotoLibrary}
        {/if}

        <input bind:this={input} bind:files={files} on:change={uploadImage} type="file" accept="image/*"
               name="image" alt=""/>
    </div>
</div>

<style lang="scss">

  .avatar {
    img, div {
      border-radius: 100%;
      object-fit: cover;
    }

    // 1062 is SweetAlerts z-index
    &.uploading {
      z-index: 1066;
    }

    &.x-small img, div {
      width: 32px;
      height: 32px;
    }

    &.small img, div {
      width: 48px;
      height: 48px;
    }

    &.medium img, div {
      width: 96px;
      height: 96px;
    }

    div {
      background-color: #29303b;
      color: #9ea1a7;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.5s ease;

      &:hover {
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