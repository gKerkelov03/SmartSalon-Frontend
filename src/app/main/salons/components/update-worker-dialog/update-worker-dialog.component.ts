import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IsNotEmptyArrayValidator } from '../../../../core/utils/validators/is-not-empty-array.validator';
import { Worker } from '../../../users/models/worker.model';
import { WorkersService } from '../../../users/services/workers.service';
import { JobTitle } from '../../models/job-title.model';
import { JobTitlesService } from '../../services/job-titles.service';

@Component({
    selector: 'app-update-worker-dialog',
    templateUrl: './update-worker-dialog.component.html',
    styleUrl: './update-worker-dialog.component.scss',
})
export class UpdateWorkerDialogComponent {
    jobTitlesControl: FormControl = new FormControl('', [
        IsNotEmptyArrayValidator,
    ]);

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            jobTitles: JobTitle[];
            worker: Worker;
            salonId: string;
        },
        private dialogRef: MatDialogRef<UpdateWorkerDialogComponent>,
        private workersService: WorkersService,
        private jobTitlesService: JobTitlesService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.jobTitlesService
            .getMany(this.dialogData.worker.jobTitles)
            .subscribe((jobTitles: JobTitle[]) => {
                this.jobTitlesControl.setValue(
                    jobTitles.map((jobTitle) => jobTitle.name),
                );
            });
    }

    saveClicked(): void {
        const newJobTitlesIds = this.jobTitlesControl.value.map(
            (jobTitleName: string) =>
                this.dialogData.jobTitles.find(
                    (jobTitle) => jobTitle.name === jobTitleName,
                )!.id,
        );

        this.workersService
            .updateWorkerJobTitles(
                this.dialogData.worker.id,
                this.dialogData.salonId,
                newJobTitlesIds,
            )
            .subscribe(() => {
                this.dialogData.worker.jobTitles = newJobTitlesIds;
                this.snackBar.open(
                    'Job titles were updated successfully',
                    'OK',
                );
                this.dialogRef.close();
            });
    }
}
