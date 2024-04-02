import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { sidebarItems } from '../core/constants/sidebar-items';
import { SidebarItem } from '../core/models/side-nav-item.model';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
    sidebarItems: SidebarItem[] = sidebarItems;
    isOpen: boolean = false;

    constructor(private dialogRef: MatDialog) {}

    ngOnDestroy(): void {
        this.dialogRef.closeAll();
    }

    onSidebarToggle(): void {
        this.isOpen = !this.isOpen;
    }
}
