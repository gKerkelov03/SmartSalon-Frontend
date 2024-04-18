import { SidebarItem } from '../models/side-nav-item.model';

export const sidebarItems: SidebarItem[] = [
    { title: 'Profile', icon: 'account_circle', path: '/main/users' },
    {
        title: 'Search salons',
        icon: 'search',
        path: '/main/salons',
    },
    {
        title: 'Subscriptions',
        icon: 'card_membership',
        path: '/main/subscriptions',
    },
    {
        title: 'Customer bookings',
        icon: 'bookmark_added',
        path: '/main/bookings/customer-active-bookings',
    },
    {
        title: 'My salons',
        icon: 'calendar_month',
        path: '/main/salons/my-salons',
    },
    {
        title: 'My bookings',
        icon: 'calendar_month',
        path: '/main/bookings/my-bookings',
    },
    {
        title: 'My calendar',
        icon: 'calendar_month',
        path: '/main/bookings/my-calendar',
    },
];
