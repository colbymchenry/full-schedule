<script>
    import {page} from '$app/stores';
    import {
        iconAnalytics,
        iconCalendar,
        iconCharts,
        iconGiftCard, iconInventory, iconLogo, iconMedicalServices,
        iconMemberships,
        iconShieldUser, iconStars,
        iconTools,
        iconUser,
        iconUsers
    } from "../icons.js";
    import {auth, navStore} from "../stores.js";
    import Avatar from '$lib/avatar.svelte';
    import Swal from "sweetalert2";
    import {Api} from "../../utils/Api.js";

    let routes = [
        {
            url: '/appointments',
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
        // {
        //     url: '/reports',
        //     icon: iconCharts,
        //     name: 'Reports'
        // },
        // {
        //     url: '/analytics',
        //     icon: iconAnalytics,
        //     name: 'Analytics'
        // },
        {
            url: '/services',
            icon: iconMedicalServices,
            name: 'Services'
        },
        {
            url: '/inventory',
            icon: iconInventory,
            name: 'Inventory'
        },
        // {
        //     url: '/members',
        //     icon: iconMemberships,
        //     name: 'Members'
        // },
        // {
        //     url: '/promotions',
        //     icon: iconGiftCard,
        //     name: 'Promotions'
        // },
        {
            url: '/settings',
            icon: iconTools,
            name: 'Settings'
        }
    ];

    let nameDiv;

    async function updateDisplayName() {
      if ($auth?.email !== import.meta.env.VITE_EMAIL) return;
        try {
            await Api.patch('/api/user', {
                uid: $auth.uid,
                displayName: nameDiv.innerHTML
            })
        } catch (error) {
            Swal.fire({
                title: "Server error. Please try again later.",
                timer: 3000,
                timerProgressBar: true,
                toast: true
            });
        }
    }
</script>


<div id="nav" class="nav full-vh" class:is--open={$navStore}>
    <div class="container">
        <div class="header">
            <div class="logo">
                {@html iconLogo}
            </div>
            <div class="icon">
                {@html iconUser}
            </div>
        </div>
        <div class="user">
            <Avatar bind:user={$auth} size="medium" dontUpload={true} canEdit={true} />
            <div class="name truncate" contenteditable="true" bind:this={nameDiv}
                 on:blur={updateDisplayName}>{$auth?.displayName || 'User'}</div>
            <div class="email truncate">{$auth?.email}</div>
        </div>

        <div class="links">
            {#each routes as route}
                <a href={'/admin' + route.url} class:is--active={$page.url.pathname.startsWith('/admin' + route.url)}>
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
    transition: max-width 0.4s var(--transition-drawer);
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;

    &.is--open {
      max-width: var(--nav-width);
    }

    .container {
      width: var(--nav-width);
      overflow-y: auto;

      .header {
        display: flex;
        padding: 16px 16px 16px 24px;
        justify-content: space-between;
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

        .name,.email {
          margin-top: 1.5rem;
          line-height: 1.5rem;
          font-weight: 500;
          font-size: 0.8125rem;
          color: #fff;
          font-family: Inter var, sans-serif;
        }

        .email {
          margin-top: -2px;
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

          &.is--active, &:hover {
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
