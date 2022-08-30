<svelte:head>
    <title>FS • Inventory</title>
</svelte:head>

<script>
    import Form from '$lib/forms/form.svelte';
    import InputField from '$lib/forms/input-field.svelte';
    import Button from '$lib/forms/button.svelte';
    import {iconPlus, iconSearch} from "../../../lib/icons.js";


    async function performSearch(formData) {

    }
</script>

<div class="container full-vh">
    <div class="content">
        <div class="header">
            <div>
                Inventory
            </div>

            <Form onSubmit={performSearch} class="search-form" hideFooter>
                <InputField placeholder="Search inventory" name="name" icon={iconSearch} class="br-20"/>
                <Button type="button" icon={iconPlus}>Add</Button>
            </Form>
        </div>


    </div>
</div>

<style lang="scss">

  .container {
    display: flex;
    background-color: white;
    overflow-x: hidden;
    overflow-y: auto;

    .content {
      flex-grow: 1;

      .header {
        padding: 2rem !important;
        display: flex;
        flex: 1 1 auto !important;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);

        > div {
          letter-spacing: -.025em !important;
          font-weight: 800 !important;
          font-size: 2rem !important;
        }
      }
    }
  }
</style>