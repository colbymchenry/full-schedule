<script>
    import {
        iconApi, iconClover,
        iconCreditCard, iconPayPal,
        iconSmartDevices,
        iconStore, iconStripe,
        iconUser,
        iconUserLock,
        iconUsers
    } from "../../../lib/icons.js";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

    const routes = [
        {
            icon: iconUser,
            name: 'Account',
            info: 'Manage your public profile and private information',
            url: ''
        },
        {
            icon: iconUserLock,
            name: 'Security',
            info: 'Manage your password',
            url: '/security'
        },
        {
            icon: iconCreditCard,
            name: 'Plan & Billing',
            info: 'Manage your subscription plan, payment method and billing information',
            url: '/billing'
        },
        {
            icon: iconUsers,
            name: 'Team',
            info: 'Manage your existing team and change roles/permissions',
            url: '/team'
        },
        {
            icon: iconStore,
            name: 'Store',
            info: 'Manage your stores address, phone number, socials, and features',
            url: '/store'
        },
        {
            icon: iconApi,
            name: 'API',
            info: 'Manage your API keys for your store',
            url: '/api'
        },
        {
            icon: iconClover,
            name: 'Clover',
            info: 'Manage and connect to your Clover POS',
            url: '/clover'
        },
        {
            icon: iconPayPal,
            name: 'PayPal',
            info: 'Manage and connect to your PayPal account',
            url: '/paypal'
        },
        {
            icon: iconStripe,
            name: 'Stripe',
            info: 'Manage and connect to your Stripe account',
            url: '/stripe'
        }
    ]

    $: activeUrl = routes.find(({url}) => $page.url.pathname === ('/admin/settings' + url))
</script>

<svelte:head>
    <title>FS • Settings</title>
</svelte:head>


<div class="container full-vh">
    <div class="navigation">
        <div class="heading">
            <h1 class="tracking-tight">Settings</h1>
        </div>
        {#each routes as route}
            <div class="route" on:click={() => goto('/admin/settings' + route.url)} class:is--active={$page.url.pathname === ('/admin/settings' + route.url)}>
                <div class="icon">
                    {@html route.icon}
                </div>
                <div>
                    <span>{route.name}</span>
                    <span>{route.info}</span>
                </div>
            </div>
        {/each}
    </div>
    <div class="content">
        <h2 class="tracking-tight">{activeUrl?.name}</h2>
        <slot></slot>
    </div>
</div>

<style lang="scss">
  .content {
    padding: 3rem;
    height: calc(100vh - var(--top-bar-height));
    overflow-y: auto;

    h2 {
      color: var(--heading-color);
      margin: 0;
    }
  }

  .container {
    display: grid;
    grid-template-columns: 0.3fr 0.75fr;
    flex-grow: 1;

    .navigation {
      background: #fff;
      border-right: 1px solid var(--border-color);

      .heading {
        margin: 2.5rem 1.5rem;
        font-size: 1rem;
        h1 {
          font-weight: 800;
          color: var(--heading-color);
          margin-left: 0.25rem;
        }
      }

      .route {
        padding: 1.25rem 2rem;
        border-top: 1px solid var(--border-color);
        display: grid;
        grid-template-columns: 32px auto;
        cursor: pointer;

        &:hover {
          background-color: #ecf0fc;
        }

        &.is--active {
          background-color: #ecf0fc;

          .icon,span:first-of-type {
            color: var(--primary-color);
          }
        }

        .icon {
          flex-shrink: 1;
          transform: scale(0.5);
          overflow: visible;
          margin-top: -1.25rem;
          margin-left: -1rem;
          color: var(--icon-gray);
        }

        > div {
          flex-grow: 1;
          display: flex;
          flex-direction: column;

          > span:first-of-type {
            font-size: 14px;
            font-weight: 500;
          }

          > span:last-of-type {
            font-size: 14px;
            color: var(--info-color);
            margin-top: 0.25rem;
          }
        }
      }

      .route:last-of-type {
        border-bottom: 1px solid var(--border-color);
      }
    }
  }
</style>