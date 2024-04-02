import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jwtTokenKey } from '../../../core/constants/local-storage-keys';
import { Theme } from '../../../core/enums/theme';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Output() toggleSide = new EventEmitter();
    isLightMode: boolean;
    changeIcon: boolean = true;

    constructor(
        private router: Router,
        private localStorageUtil: LocalStorageService,
        public currentUserService: CurrentUserService,
        public themeService: ThemeService,
        private dialog: MatDialog
    ) {
        this.themeService.initTheme();
        this.isLightMode = this.themeService.isLightMode();
    }

    navigateToProfile(): void {
        const userId = this.currentUserService.currentUser!.id;
        this.router.navigate(['main/users', userId]);
    }

    onSidebarToggle(): void {
        this.toggleSide.emit();
    }

    toggleLightMode($event: Event): void {
        $event.stopPropagation();
        this.changeIcon = !this.changeIcon;
        this.isLightMode = this.themeService.isLightMode();

        this.isLightMode
            ? this.themeService.update(Theme.darkMode)
            : this.themeService.update(Theme.lightMode);
    }

    logout(): void {
        this.localStorageUtil.deleteItem(jwtTokenKey);
        this.currentUserService.clearCurrentUser();
        this.router.navigate(['public']);
    }
}
