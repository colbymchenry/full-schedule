<script>
    import {iconPhotoLibrary} from "./icons.js";
    import Swal from "sweetalert2";
    import axios from "axios";

    export let user;
    export let size;

    let src = user?.providerData[0].photoURL;

    let clazz;
    export { clazz as class };

    let input;
    let files;
    let uploading = false;

    function openFileDrawer() {
        input.click();
    }

    async function uploadImage() {
        if (files.length) {

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

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                src = reader.result;
            });
            reader.readAsDataURL(files[0]);

            uploading = true;

            const keep = await Swal.fire({
                title: 'Keep it?',
                text: 'Click no to retry.',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No'
            });

            uploading = false;

            if (keep.isDenied) {
                src = user?.providerData[0].photoURL;
                return;
            }

            await Swal.fire({
                title: 'Uploading file...'
            });
            Swal.showLoading();

            try {
                const imgUpload = await axios.post('https://api.cloudinary.com/v1_1/dfpldejtd/image/upload', {
                    file: src,
                    upload_preset: 'my-uploads'
                });

                axios.defaults.headers.common['authorization'] = user.stsTokenManager.accessToken;

                await axios.patch('/api/user', {
                    uid: user.uid,
                    photoURL: imgUpload.data["secure_url"]
                });

                // TODO: It's not updating the context of the user

                Swal.close();
            } catch (error) {
                await Swal.fire({
                    title: 'Error Reported',
                    text: 'A Full Schedule helper has been contacted.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });

                src = user?.providerData[0].photoURL;
            }
        }
    }
</script>

<div class={`avatar ${clazz || ''} ${size || 'small'} ${uploading ? 'uploading' : ''}`}>
    {#if src}
        <img src={src} loading="lazy" alt="">
    {:else}
        <div on:click={openFileDrawer}>
            <input bind:this={input} bind:files={files} on:change={uploadImage} type="file" accept="image/*" name="image" alt=""  />
            {@html iconPhotoLibrary}
        </div>
    {/if}
</div>

<style lang="scss">

  .avatar {
    img,div {
      border-radius: 100%;
      object-fit: cover;
    }

    // 1062 is SweetAlerts z-index
    &.uploading {
      z-index: 1066;
    }

    &.x-small img,div {
      width: 32px;
      height: 32px;
    }

    &.small img,div {
      width: 48px;
      height: 48px;
    }

    &.medium img,div {
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