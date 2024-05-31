import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-owner-dialog',
    templateUrl: './add-owner-dialog.component.html',
    styleUrl: './add-owner-dialog.component.scss',
})
//TODO: try mergin the AddOwnerDialog and AddWorkerDialog in one component
export class AddOwnerDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            salonId: string;
        },
        public dialogRef: MatDialogRef<AddOwnerDialogComponent>,
    ) {}

    closeTheDialog() {
        this.dialogRef.close();
    }
}
