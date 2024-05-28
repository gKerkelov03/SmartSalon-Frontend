import { Component, Input } from '@angular/core';
import { jwtTokenKey } from '../../../core/constants/local-storage-keys';
import { SidenavItemData } from '../../../core/models/sidenav-item-data.model';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
    selector: 'app-sidenav-item',
    templateUrl: './sidenav-item.component.html',
    styleUrl: './sidenav-item.component.scss',
})
export class SidenavItemComponent {
    @Input()
    sidenavItemData!: SidenavItemData;

    constructor(
        private localStorage: LocalStorageService,
        private currentUser: CurrentUserService,
    ) {}

    @Input()
    isLogout!: boolean;

    clicked(): void {
        if (this.isLogout) {
            this.localStorage.deleteItem(jwtTokenKey);
            this.currentUser.clearCurrentUser();
        }
    }
}
