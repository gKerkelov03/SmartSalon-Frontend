import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { sidenavItems } from '../core/constants/sidenav-items';
import { SidenavItem } from '../core/models/side-nav-item.model';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
    sidenavItems: SidenavItem[] = sidenavItems;
    isOpen: boolean = false;

    constructor(private dialogRef: MatDialog) {}

    ngOnDestroy(): void {
        this.dialogRef.closeAll();
    }

    onSidebarToggle(): void {
        this.isOpen = !this.isOpen;
    }
}
