import { SidenavItem } from '../models/side-nav-item.model';

export const sidenavItems: SidenavItem[] = [
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
        title: 'My bookings',
        icon: 'bookmark_added',
        path: '/main/bookings/my-bookings',
    },
    {
        title: 'My salons',
        icon: 'storefront',
        path: '/main/salons/my-salons',
    },
    {
        title: 'My calendar',
        icon: 'calendar_month',
        path: '/main/bookings/my-calendar',
    },
];
