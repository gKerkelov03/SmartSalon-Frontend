import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sidenavItems } from '../core/constants/sidenav-items';
import { blankProfilePictureUrl } from '../core/constants/urls';
import { Theme } from '../core/enums/theme';
import { SidenavItem } from '../core/models/side-nav-item.model';
import { CurrentUserService } from '../core/services/current-user.service';
import { ThemeService } from '../core/services/theme.service';
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    sidenavItems: SidenavItem[] = sidenavItems;
    isSidenavExpanded: boolean = false;
    isLightMode!: boolean;
    changeIcon: boolean = true;
    profilePictureUrl!: string;

    constructor(
        private router: Router,
        public currentUser: CurrentUserService,
        public theme: ThemeService,
    ) {}

    ngOnInit(): void {
        this.theme.initTheme();
        this.isLightMode = this.theme.isLightMode();
        this.profilePictureUrl =
            this.currentUser.currentUser?.profilePictureUrl ??
            blankProfilePictureUrl;
    }

    navigateToProfile(): void {
        const userId = this.currentUser.currentUser!.id;
        this.router.navigate(['main/users', userId]);
    }

    toggleLightMode(event: Event): void {
        event.stopPropagation();
        this.changeIcon = !this.changeIcon;
        this.isLightMode = this.theme.isLightMode();

        if (this.isLightMode) {
            this.theme.update(Theme.darkMode);
        } else {
            this.theme.update(Theme.lightMode);
        }
    }
}
