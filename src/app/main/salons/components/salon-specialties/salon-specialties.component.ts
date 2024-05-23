import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Specialty } from '../../models/specialty.model';
import { SalonSpecialtyDialogComponent } from '../salon-specialty-dialog/salon-specialty-dialog.component';

@Component({
    selector: 'app-salon-specialties',
    templateUrl: './salon-specialties.component.html',
    styleUrl: './salon-specialties.component.scss',
})
export class SalonSpecialtiesComponent {
    @Input()
    salonId!: string;

    @Input()
    specialties!: Specialty[];

    @Input()
    canEdit: boolean = false;

    constructor(private dialog: MatDialog) {}

    openSalonSpecialtyDialog(
        action: 'edit' | 'create',
        specialty?: Specialty,
    ): void {
        const dialogRef = this.dialog.open(SalonSpecialtyDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: { action, specialty, salonId: this.salonId },
            enterAnimationDuration: '300ms',
        });

        type dialogResult = {
            specialty: Specialty;
            action: 'edit' | 'create';
        };

        const observer = {
            next: (result: dialogResult) => {
                if (action === 'edit') {
                    this.specialties.find(
                        (specialty) => specialty.id === result.specialty.id,
                    )!.text = result.specialty.text;
                } else {
                    this.specialties.push(result.specialty);
                }
            },
        };

        dialogRef.afterClosed().subscribe(observer);
    }
}
