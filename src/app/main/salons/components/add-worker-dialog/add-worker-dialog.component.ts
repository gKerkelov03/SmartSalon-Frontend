import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobTitle } from '../../models/job-title.model';

@Component({
    selector: 'app-add-worker-dialog',
    templateUrl: './add-worker-dialog.component.html',
    styleUrl: './add-worker-dialog.component.scss',
})
export class AddWorkerDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            salonId: string;
            jobTitles: JobTitle[];
        },
        public dialogRef: MatDialogRef<AddWorkerDialogComponent>,
    ) {}

    closeTheDialog() {
        this.dialogRef.close();
    }
}
