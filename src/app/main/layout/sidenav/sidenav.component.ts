import { Component, Input } from '@angular/core';
import { sidenavItems } from '../../../core/constants/sidenav-items';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
    @Input()
    profilePictureUrl!: string;

    sidenavItems = sidenavItems;
}
