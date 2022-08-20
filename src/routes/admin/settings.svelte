<script>

    import Account from '$lib/settings/account.svelte';
    import Security from '$lib/settings/security.svelte';
    import Billing from '$lib/settings/billing.svelte';
    import Team from '$lib/settings/team.svelte';
    import {iconApi, iconCreditCard, iconStore, iconUser, iconUserLock, iconUsers} from "../../lib/icons.js";

    const routes = [
        {
            icon: iconUser,
            name: 'Account',
            info: 'Manage your public profile and private information',
            component: Account
        },
        {
            icon: iconUserLock,
            name: 'Security',
            info: 'Manage your password',
            component: Security
        },
        {
            icon: iconCreditCard,
            name: 'Plan & Billing',
            info: 'Manage your subscription plan, payment method and billing information',
            component: Billing
        },
        {
            icon: iconUsers,
            name: 'Team',
            info: 'Manage your existing team and change roles/permissions',
            component: Team
        },
        {
            icon: iconStore,
            name: 'Store',
            info: 'Manage your stores address, phone number, socials, and features',
            component: Team
        },
        {
            icon: iconApi,
            name: 'API',
            info: 'Manage your API keys for your store.',
            component: Team
        }
    ]

    let activeRoute = routes[0];
</script>

<div class="container">
    <div class="navigation">
        <div class="heading">
            <h1 class="tracking-tight">Settings</h1>
        </div>
        {#each routes as route}
            <div class="route" on:click={() => activeRoute = route} class:is--active={activeRoute.name === route.name}>
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
        <h2 class="tracking-tight">{activeRoute.name}</h2>
        <svelte:component this={activeRoute.component}/>
    </div>
</div>

<style lang="scss">
  .content {
    padding: 3rem;

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