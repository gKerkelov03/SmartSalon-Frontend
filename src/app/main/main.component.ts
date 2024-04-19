import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtTokenKey } from '../core/constants/local-storage-keys';
import { sidenavItems } from '../core/constants/sidenav-items';
import { Theme } from '../core/enums/theme';
import { SidenavItem } from '../core/models/side-nav-item.model';
import { CurrentUserService } from '../core/services/current-user.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { ThemeService } from '../core/services/theme.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    sidenavItems: SidenavItem[] = sidenavItems;
    isOpen: boolean = false;
    isLightMode: boolean;
    changeIcon: boolean = true;

    constructor(
        private router: Router,
        private localStorageUtil: LocalStorageService,
        public currentUserService: CurrentUserService,
        public themeService: ThemeService
    ) {
        this.themeService.initTheme();
        this.isLightMode = this.themeService.isLightMode();
    }
    ngOnDestroy(): void {}

    onSidebarToggle(): void {
        this.isOpen = !this.isOpen;
    }

    navigateToProfile(): void {
        const userId = this.currentUserService.currentUser!.id;
        this.router.navigate(['main/users', userId]);
    }

    toggleLightMode(event: Event): void {
        event.stopPropagation();
        this.changeIcon = !this.changeIcon;
        this.isLightMode = this.themeService.isLightMode();

        if (this.isLightMode) {
            this.themeService.update(Theme.darkMode);
        } else {
            this.themeService.update(Theme.lightMode);
        }
    }

    logout(): void {
        this.localStorageUtil.deleteItem(jwtTokenKey);
        this.currentUserService.clearCurrentUser();
        this.router.navigate(['public']);
    }
}
