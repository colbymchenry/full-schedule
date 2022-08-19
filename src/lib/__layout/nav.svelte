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


<div class="nav">
    <div class="nav__container">
        <div id="w-node-_86baeb10-2a6c-fd59-2079-eea6de3c016c-de3c016a" class="nav__header">
            <div class="nav__header-icon w-embed">
                {@html iconUser}
            </div>
        </div>
        <div id="w-node-_86baeb10-2a6c-fd59-2079-eea6de3c016e-de3c016a" class="nav__user">
            <img src="/images/brian-hughes.jpg" loading="lazy" alt="" class="nav__user-img">
            <div class="nav__user-name">Brian Hughes</div>
            <div class="nav__user-email">hughes.brian@company.com</div>
        </div>
        <div id="w-node-_86baeb10-2a6c-fd59-2079-eea6de3c0174-de3c016a" class="nav__links">
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname === "/admin"}>
                <div class="nav__link-svg w-embed">
                    {@html iconCalendar}
                </div>
                <div class="nav__link-text">Appointments</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/clients")}>
                <div class="nav__link-svg w-embed">
                    {@html iconUsers}
                </div>
                <div class="nav__link-text">Clients</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/staff")}>
                <div class="nav__link-svg w-embed">
                    {@html iconShieldUser}
                </div>
                <div class="nav__link-text">Staff</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/reports")}>
                <div class="nav__link-svg w-embed">
                    {@html iconCharts}
                </div>
                <div class="nav__link-text">Reports</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/analytics")}>
                <div class="nav__link-svg w-embed">
                    {@html iconAnalytics}
                </div>
                <div class="nav__link-text">Analytics</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/promotions")}>
                <div class="nav__link-svg w-embed">
                    {@html iconGiftCard}
                </div>
                <div class="nav__link-text">Promotions</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/memberships")}>
                <div class="nav__link-svg w-embed">
                    {@html iconMemberships}
                </div>
                <div class="nav__link-text">Memberships</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/clover-devices")}>
                <div class="nav__link-svg w-embed">
                    {@html iconSmartDevices}
                </div>
                <div class="nav__link-text">Clover Devices</div>
            </a>
            <a href="/admin" class="nav__link w-inline-block" class:is--active={$page.url.pathname.startsWith("/admin/settings")}>
                <div class="nav__link-svg w-embed">
                    {@html iconCog}
                </div>
                <div class="nav__link-text">Settings</div>
            </a>
        </div>
    </div>
</div>

