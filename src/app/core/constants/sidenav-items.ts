import { SidenavItemData } from '../models/sidenav-item-data.model';

export const sidenavItems: SidenavItemData[] = [
    { title: 'Profile', icon: 'account_circle', path: '/main/users/profile' },
    {
        title: 'Search salons',
        icon: 'search',
        path: '/main/salons',
    },
    {
        title: 'My bookings',
        icon: 'bookmark_added',
        path: '/main/bookings/my-bookings',
    },
    {
        title: 'My calendar',
        icon: 'calendar_month',
        path: '/main/bookings/my-calendar',
    },
    {
        title: 'My salons',
        icon: 'storefront',
        path: '/main/salons/my-salons',
    },
];
