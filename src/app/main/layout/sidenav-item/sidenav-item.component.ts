import { Component, Input } from '@angular/core';
import { SidenavItemData } from '../../../core/models/sidenav-item-data.model';

@Component({
    selector: 'app-sidenav-item',
    templateUrl: './sidenav-item.component.html',
    styleUrl: './sidenav-item.component.scss',
})
export class SidenavItemComponent {
    @Input()
    sidenavItemData!: SidenavItemData;
}
