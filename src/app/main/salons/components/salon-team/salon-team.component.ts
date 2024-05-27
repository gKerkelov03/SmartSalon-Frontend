import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Worker } from '../../../users/models/worker.model';
import { JobTitle } from '../../models/job-title.model';
import { AddWorkerDialogComponent } from '../add-worker-dialog/add-worker-dialog.component';

@Component({
    selector: 'app-salon-team',
    templateUrl: './salon-team.component.html',
    styleUrl: './salon-team.component.scss',
})
export class SalonTeamComponent {
    @Input()
    team!: Worker[];

    @Input()
    canEdit!: boolean;

    @Input()
    salonId!: string;

    @Input()
    jobTitles!: JobTitle[];

    constructor(private dialog: MatDialog) {}

    openAddWorkerDialog(): void {
        const dialogRef = this.dialog.open(AddWorkerDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                salonId: this.salonId,
                jobTitles: this.jobTitles,
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .subscribe((result: { worker: Worker } | undefined) => {
                if (result?.worker) {
                    this.team.push(result.worker);
                }
            });
    }
}
