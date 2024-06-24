import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-confirm-deletion-dialog',
    templateUrl: './confirm-deletion-dialog.component.html',
    styleUrl: './confirm-deletion-dialog.component.scss',
})
export class ConfirmDeletionDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            text: string | null;
            title: string | null;
            deleteButtonText: string | null;
        },
        private dialogRef: MatDialogRef<ConfirmDeletionDialogComponent>,
    ) {}

    deleteClicked(): void {
        this.dialogRef.close({
            isDeleted: true,
        });
    }
}
