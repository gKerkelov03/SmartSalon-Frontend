import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Specialty } from '../../models/specialty.model';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
    selector: 'app-delete-specialty-dialog',
    templateUrl: './delete-specialty-dialog.component.html',
    styleUrl: './delete-specialty-dialog.component.scss',
})
export class DeleteSpecialtyDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { specialty: Specialty; salonId: string },
        private dialogRef: MatDialogRef<DeleteSpecialtyDialogComponent>,
        private specialtiesService: SpecialtiesService,
        private snackBar: MatSnackBar,
    ) {}

    deleteClicked(): void {
        const observer = {
            next: () => {
                this.dialogRef.close({
                    specialty: this.dialogData.specialty,
                    action: 'delete',
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.specialtiesService
            .delete(this.dialogData.specialty.id, this.dialogData.salonId)
            .subscribe(observer);
    }
}
