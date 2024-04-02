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
        title: 'Worker calendar',
        icon: 'calendar_month',
        path: '/main/bookings/worker-bookings',
    },
];
