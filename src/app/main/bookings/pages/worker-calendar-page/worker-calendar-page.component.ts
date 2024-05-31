import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { Worker } from '../../../users/models/worker.model';
import { WorkersService } from '../../../users/services/workers.service';

@Component({
    selector: 'app-worker-calendar-page',
    templateUrl: './worker-calendar-page.component.html',
    styleUrl: './worker-calendar-page.component.scss',
})
export class WorkerCalendarPageComponent implements OnInit {
    worker!: Worker;

    constructor(
        private dialog: MatDialog,
        public currentUser: CurrentUserService,
        private workersService: WorkersService,
    ) {}

    ngOnInit(): void {
        this.fetchWorker();
    }

    displayEventDialog(): void {}

    fetchWorker(): void {
        this.workersService
            .getById(this.currentUser.currentUser!.id)
            .subscribe((worker: Worker) => {
                console.log(worker);
                this.worker = worker;
            });
    }
}
