import { Component, Input, OnInit } from '@angular/core';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { SidenavItemData } from '../../../core/models/sidenav-item-data.model';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { isValidUrl } from '../../../core/utils/is-valid-url';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
    @Input()
    profilePictureUrl?: string;
    sidenavItems = this.getSidenavItems();
    logoutSideNavItemData = {
        title: 'Logout',
        icon: 'logout',
        path: '/public/login',
    };

    constructor(private currentUser: CurrentUserService) {}

    getSidenavItems(): SidenavItemData[] {
        const routes = [
            {
                title: 'Profile',
                icon: 'account_circle',
                path: '/main/users/profile',
            },
        ];

        if (this.currentUser.isCustomer) {
            routes.push({
                title: 'Search salons',
                icon: 'search',
                path: '/main/salons',
            });
            routes.push({
                title: 'My bookings',
                icon: 'bookmark_added',
                path: '/main/bookings/my-bookings',
            });
        } else if (this.currentUser.isWorker) {
            routes.push({
                title: 'My calendar',
                icon: 'calendar_month',
                path: '/main/bookings/my-calendar',
            });
        } else if (this.currentUser.isOwner) {
            routes.push({
                title: 'My salons',
                icon: 'storefront',
                path: '/main/salons/my-salons',
            });
        } else if (this.currentUser.isAdmin) {
            routes.push({
                title: 'Search salons',
                icon: 'search',
                path: '/main/salons',
            });
        }

        return routes;
    }

    ngOnInit(): void {
        this.setBlankProfilePictureIfNeeded();
    }

    setBlankProfilePictureIfNeeded(): void {
        if (!isValidUrl(this.profilePictureUrl)) {
            this.profilePictureUrl = blankProfilePictureUrl;
        }
    }
}
