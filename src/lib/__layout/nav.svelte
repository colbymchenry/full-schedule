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
</script>


<div class="nav full-vh">
    <div class="container">
        <div class="header">
            <div class="icon">
                {@html iconUser}
            </div>
        </div>
        <div class="user">
            <img src="/images/brian-hughes.jpg" loading="lazy" alt="">
            <div class="name">Brian Hughes</div>
            <div class="email">hughes.brian@company.com</div>
        </div>
        <div class="links">
            <a href="/admin" class:is--active={$page.url.pathname === "/admin"}>
                <div>
                    {@html iconCalendar}
                </div>
                <div>Appointments</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/clients")}>
                <div>
                    {@html iconUsers}
                </div>
                <div>Clients</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/staff")}>
                <div>
                    {@html iconShieldUser}
                </div>
                <div>Staff</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/reports")}>
                <div>
                    {@html iconCharts}
                </div>
                <div>Reports</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/analytics")}>
                <div>
                    {@html iconAnalytics}
                </div>
                <div>Analytics</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/promotions")}>
                <div>
                    {@html iconGiftCard}
                </div>
                <div>Promotions</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/memberships")}>
                <div>
                    {@html iconMemberships}
                </div>
                <div>Memberships</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/clover-devices")}>
                <div>
                    {@html iconSmartDevices}
                </div>
                <div>Clover Devices</div>
            </a>
            <a href="/admin" class:is--active={$page.url.pathname.startsWith("/admin/settings")}>
                <div>
                    {@html iconCog}
                </div>
                <div>Settings</div>
            </a>
        </div>
    </div>
</div>

<style lang="scss">
  .nav {
    background-color: #0F172A;

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

        img {
          width: 96px;
          height: 96px;
          border-radius: 100%;
        }

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
