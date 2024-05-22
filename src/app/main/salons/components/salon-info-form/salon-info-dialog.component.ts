import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Salon } from '../../models/salon.model';

@Component({
    selector: 'app-salon-info-dialog',
    templateUrl: './salon-info-dialog.component.html',
    styleUrl: './salon-info-dialog.component.scss',
})
export class SalonInfoDialogComponent implements OnInit {
    salon: Salon = this.dialogData;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private dialogData: Salon,
        private router: Router,
    ) {}

    ngOnInit(): void {}

    openSalonDetailsPage(): void {
        this.router.navigate([`main/salons/${this.salon.id}`]);
    }
}
