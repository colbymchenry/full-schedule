<script>
    import {page} from '$app/stores';
    import {
        iconAnalytics,
        iconCalendar,
        iconCharts, iconCog,
        iconGiftCard, iconMemberships,
        iconShieldUser, iconSmartDevices,
        iconUser,
        iconUsers
    } from "../icons.js";
    import {writableNav} from "../stores.js";
    import {onDestroy} from "svelte";
    import Avatar from '$lib/avatar.svelte';
    import {FirebaseClient} from "../../utils/firebase/FirebaseClient.js";

    let isNavOpen;

    const unsubscribe = writableNav.subscribe(value => {
        isNavOpen = value;
    });

    onDestroy(unsubscribe);

    let routes = [
        {
            url: '/',
            icon: iconCalendar,
            name: 'Appointments'
        },
        {
            url: '/clients',
            icon: iconUsers,
            name: 'Clients'
        },
        {
            url: '/staff',
            icon: iconShieldUser,
            name: 'Staff'
        },
        {
            url: '/admin/reports',
            icon: iconCharts,
            name: 'Reports'
        },
        {
            url: '/admin/analytics',
            icon: iconAnalytics,
            name: 'Analytics'
        },
        {
            url: '/admin/promotions',
            icon: iconGiftCard,
            name: 'Promotions'
        },
        {
            url: '/admin/memberships',
            icon: iconMemberships,
            name: 'Members'
        },
        {
            url: '/admin/clover-devices',
            icon: iconSmartDevices,
            name: 'Clover Devices'
        },
        {
            url: '/admin/settings',
            icon: iconCog,
            name: 'Settings'
        }
    ];
</script>


<div class="nav full-vh" class:is--open={isNavOpen}>
    <div class="container">
        <div class="header">
            <div class="icon">
                {@html iconUser}
            </div>
        </div>
        <div class="user">
            <Avatar user={FirebaseClient.auth().currentUser} size="medium" />
            <div class="name">{FirebaseClient.auth().currentUser?.displayName || 'User'}</div>
            <div class="email">{FirebaseClient.auth().currentUser?.email}</div>
        </div>

        <div class="links">
            {#each routes as route}
                <a href={'/admin' + route.url} class:is--active={$page.url.pathname === ('/admin' + route.url)}>
                    <div>
                        {@html route.icon}
                    </div>
                    <div>{route.name}</div>
                </a>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
  .nav {
    background-color: #0F172A;
    max-width: 0;
    transition: max-width 1s ease;

    &.is--open {
      max-width: 280px;
      transition: max-width 1s ease;
    }

    .container {
      width: 280px;
      overflow-y: auto;

      .header {
        display: flex;
        padding: 16px 16px 16px 24px;
        justify-content: flex-end;
        align-items: center;

        .icon {
          transform: scale(0.5);
          color: var(--icon-gray);
        }
      }

      .user {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .name {
          margin-top: 16px;
          color: #fff;
          font-family: Inter var, sans-serif;
        }

        .email {
          margin-top: 2px;
          color: rgb(148, 163, 182);
        }
      }

      .links {
        margin-top: 40px;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr;

        a {
          display: flex;
          height: 66px;
          margin-right: 12px;
          margin-bottom: 4px;
          margin-left: 12px;
          align-items: center;
          border-radius: 6px;
          color: rgb(159, 162, 169);
          text-decoration: none;

          &.is--active,&:hover {
            background-color: rgb(41, 48, 60);
            color: rgb(255, 255, 255);
          }

          > div:first-of-type {
            transform: scale(0.5);
          }
        }
      }
    }
  }

</style>
