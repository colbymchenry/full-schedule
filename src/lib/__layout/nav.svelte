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
    import {authStore, navStore} from "../stores.js";
    import Avatar from '$lib/avatar.svelte';
    import axios from "axios";
    import Swal from "sweetalert2";

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
            url: '/',
            icon: iconShieldUser,
            name: 'Staff'
        },
        {
            url: '/',
            icon: iconCharts,
            name: 'Reports'
        },
        {
            url: '/',
            icon: iconAnalytics,
            name: 'Analytics'
        },
        {
            url: '/',
            icon: iconGiftCard,
            name: 'Promotions'
        },
        {
            url: '/',
            icon: iconMemberships,
            name: 'Members'
        },
        {
            url: '/',
            icon: iconSmartDevices,
            name: 'Clover Devices'
        },
        {
            url: '/settings',
            icon: iconCog,
            name: 'Settings'
        }
    ];

    let nameDiv;
    async function updateDisplayName() {
        try {
            // update Google User in the backend
            axios.defaults.headers.common['authorization'] = await $authStore.getIdToken();
            await axios.patch('/api/user', {
                uid: $authStore.uid,
                displayName: nameDiv.innerHTML
            });
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


<div class="nav full-vh" class:is--open={$navStore}>
    <div class="container">
        <div class="header">
            <div class="icon">
                {@html iconUser}
            </div>
        </div>
        <div class="user">
            <Avatar bind:user={$authStore} size="medium" />
            <div class="name" contenteditable="true" bind:this={nameDiv} on:blur={updateDisplayName}>{$authStore?.displayName || 'User'}</div>
            <div class="email">{$authStore?.email}</div>
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
    transition: max-width 0.4s var(--transition-drawer);

    &.is--open {
      max-width: 280px;
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
