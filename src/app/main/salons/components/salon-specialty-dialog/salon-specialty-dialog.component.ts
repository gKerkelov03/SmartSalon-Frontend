import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { Specialty } from '../../models/specialty.model';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
    selector: 'app-salon-specialty-dialog',
    templateUrl: './salon-specialty-dialog.component.html',
    styleUrl: './salon-specialty-dialog.component.scss',
})
export class SalonSpecialtyDialogComponent {
    specialtyControl!: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            specialty?: Specialty;
            salonId: string;
            action: 'edit' | 'create';
        },
        private dialogRef: MatDialogRef<SalonSpecialtyDialogComponent>,
        private specialtiesService: SpecialtiesService,
    ) {}

    ngOnInit(): void {
        this.specialtyControl = new FormControl(
            this.dialogData.specialty?.text,
            [Validators.required],
        );
    }

    saveClicked(): void {
        if (this.dialogData.action === 'edit') {
            this.specialtiesService
                .update(
                    this.specialtyControl.value,
                    this.dialogData.specialty!.id,
                    this.dialogData.salonId,
                )
                .subscribe(() => {
                    this.dialogData.specialty!.text =
                        this.specialtyControl.value;

                    this.dialogRef.close({
                        specialty: this.dialogData.specialty,
                        action: this.dialogData.action,
                    });
                });
        } else if (this.dialogData.action === 'create') {
            this.specialtiesService
                .create(this.specialtyControl.value, this.dialogData.salonId)
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.specialtiesService.getById(
                            response.createdResourceId,
                        ),
                    ),
                )
                .subscribe((specialty: Specialty) =>
                    this.dialogRef.close({
                        specialty,
                        action: this.dialogData.action,
                    }),
                );
        }
    }

    deleteClicked(): void {
        this.dialogRef.close({
            specialty: this.dialogData.specialty,
            action: 'delete',
        });
    }
}
