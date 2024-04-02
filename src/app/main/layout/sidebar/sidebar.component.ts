import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sidebarItems } from '../../../core/constants/sidebar-items';
import { SidebarItem } from '../../../core/models/side-nav-item.model';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input() isOpen!: boolean;
    @Output() sideClick = new EventEmitter();
    sidenavItems: SidebarItem[] = sidebarItems;

    constructor(public currentUserService: CurrentUserService) {}

    changePage(): void {
        this.sideClick.emit();
    }
}
