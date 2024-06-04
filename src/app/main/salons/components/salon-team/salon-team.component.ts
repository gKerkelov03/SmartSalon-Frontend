import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { Worker } from '../../../users/models/worker.model';
import { JobTitle } from '../../models/job-title.model';
import { AddWorkerDialogComponent } from '../add-worker-dialog/add-worker-dialog.component';
import { UpdateWorkerDialogComponent } from '../update-worker-dialog/update-worker-dialog.component';

@Component({
    selector: 'app-salon-team',
    templateUrl: './salon-team.component.html',
    styleUrl: './salon-team.component.scss',
})
export class SalonTeamComponent implements OnInit {
    @Output()
    workerSelectedEvent: EventEmitter<Worker> = new EventEmitter<Worker>();

    @Input()
    team!: Worker[];

    @Input()
    canEdit!: boolean;

    @Input()
    salonId!: string;

    @Input()
    jobTitles!: JobTitle[];

    @Input()
    jobTitlesFilter!: JobTitle[];

    constructor(
        private dialog: MatDialog,
        public currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        if (this.jobTitlesFilter) {
            this.team = this.team.filter((worker) =>
                worker.jobTitles.some((workerJobTitleId) =>
                    this.jobTitlesFilter.some(
                        (jobTitle) => jobTitle.id === workerJobTitleId,
                    ),
                ),
            );
        }
    }

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

    workerSelected(worker: Worker): void {
        this.workerSelectedEvent.emit(worker);
    }

    deleteWorker(worker: Worker): void {
        this.workerSelectedEvent.emit(worker);
    }

    editWorker(worker: Worker): void {
        this.dialog.open(UpdateWorkerDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                worker,
                jobTitles: this.jobTitles,
                salonId: this.salonId,
            },
            enterAnimationDuration: '300ms',
        });
    }
}
