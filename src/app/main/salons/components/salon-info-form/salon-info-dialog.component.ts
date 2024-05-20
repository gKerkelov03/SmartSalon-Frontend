import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salon-info-dialog',
    templateUrl: './salon-info-dialog.component.html',
    styleUrl: './salon-info-dialog.component.scss',
})
export class SalonInfoDialogComponent {
    salon: Salon;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private dialogData: Salon,
        private dialogRef: MatDialogRef<SalonInfoDialogComponent>,
        private router: Router,
    ) {
        this.salon = dialogData;
    }

    openSalonDetailsPage(): void {
        this.router.navigate([`main/salons/${this.salon.id}`]);
    }
}