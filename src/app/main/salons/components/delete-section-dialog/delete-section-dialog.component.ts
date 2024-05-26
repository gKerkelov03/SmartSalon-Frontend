import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudAction } from '../../../../core/enums/crud-action';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Section } from '../../models/section.model';
import { SectionsService } from '../../services/sections.service';

@Component({
    selector: 'app-delete-section-dialog',
    templateUrl: './delete-section-dialog.component.html',
    styleUrl: './delete-section-dialog.component.scss',
})
export class DeleteSectionDialogComponent {
    servicesCount: number = this.dialogData.section.categories.reduce(
        (acc, curr) => acc + curr.services.length,
        0,
    );

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { section: Section; salonId: string },
        private dialogRef: MatDialogRef<DeleteSectionDialogComponent>,
        private sectionsService: SectionsService,
        private snackBar: MatSnackBar,
    ) {}

    deleteClicked(): void {
        const observer = {
            next: () => {
                this.dialogRef.close({
                    section: this.dialogData.section,
                    action: CrudAction.Delete,
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.sectionsService
            .delete(this.dialogData.section.id, this.dialogData.salonId)
            .subscribe(observer);
    }
}
