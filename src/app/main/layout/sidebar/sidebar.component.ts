import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sidenavItems } from '../../../core/constants/sidenav-items';
import { SidenavItem } from '../../../core/models/side-nav-item.model';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() isOpen!: boolean;
    @Output() sideClick = new EventEmitter();
    sidenavItems: SidenavItem[] = sidenavItems;

    constructor(public currentUserService: CurrentUserService) {}

    changePage(): void {
        this.sideClick.emit();
    }
}
