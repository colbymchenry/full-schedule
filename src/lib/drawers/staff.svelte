<script>
    import Drawer from '$lib/drawer.svelte';
    import Button from '$lib/forms/button.svelte';
    import {iconClose} from "../icons.js";

    export let staff;
    let headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $: if (staff) {
        headerImg = `/images/cover${getRandomInt(1, 10)}.jpg`;
    }
</script>

<Drawer open={staff}>
    <div class="header">
        <img src={headerImg} loading="lazy" alt=""/>
        <Button type="button" color="icon" icon={iconClose}
                style="position: absolute;top: 2rem;right: 3rem;color: #fff;background-color: rgba(0, 0, 0, 0.5);" callback={() => staff = null}/>
    </div>
    <div class="body">

    </div>
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
  }
</style>