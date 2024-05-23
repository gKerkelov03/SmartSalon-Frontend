import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Specialty } from '../../models/specialty.model';
import { DeleteSpecialtyDialogComponent } from '../delete-specialty-dialog/delete-specialty-dialog.component';
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
            action: 'edit' | 'create' | 'delete';
        };

        const observer = {
            next: (result: dialogResult) => {
                if (result.action === 'edit') {
                    this.specialties.find(
                        (specialty) => specialty.id === result.specialty.id,
                    )!.text = result.specialty.text;
                } else if (result.action === 'create') {
                    this.specialties.push(result.specialty);
                } else if (result.action === 'delete') {
                    const confirmDeletionDialogRef = this.dialog.open(
                        DeleteSpecialtyDialogComponent,
                        {
                            width: '40vw',
                            autoFocus: false,
                            panelClass: 'round-without-padding',
                            data: {
                                specialty: result.specialty,
                                salonId: this.salonId,
                            },
                            enterAnimationDuration: '300ms',
                        },
                    );

                    confirmDeletionDialogRef
                        .afterClosed()
                        .subscribe((result) => {
                            console.log(result);
                            if (result) {
                                const index = this.specialties.indexOf(
                                    result.specialty,
                                );

                                if (index >= 0) {
                                    this.specialties.splice(index, 1);
                                }
                            }
                        });
                }
            },
        };

        dialogRef.afterClosed().subscribe(observer);
    }
}
