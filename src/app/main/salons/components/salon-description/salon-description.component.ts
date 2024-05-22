import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { Salon } from '../../models/salon.model';
import { EditSalonDescriptionDialogComponent } from '../edit-salon-description-dialog/edit-salon-description-dialog.component';

@Component({
    selector: 'app-salon-description',
    templateUrl: './salon-description.component.html',
    styleUrl: './salon-description.component.scss',
})
export class SalonDescriptionComponent implements OnInit {
    @Input()
    salon!: Salon;

    constructor(
        private currentUser: CurrentUserService,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        console.log(this.salon.description);
    }

    openEditDescriptionDialog(): void {
        this.dialog.open(EditSalonDescriptionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: this.salon,
            enterAnimationDuration: '300ms',
        });
    }

    get canEdit(): boolean {
        return this.currentUser.isAdmin || this.currentUser.isOwner;
    }
}
