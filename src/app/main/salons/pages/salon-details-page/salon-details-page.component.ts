import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { idRouteParameterName } from '../../../../core/constants/routing';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Worker } from '../../../users/models/worker.model';
import { WorkersService } from '../../../users/services/workers.service';
import { Salon } from '../../models/salon.model';
import { WorkingTime } from '../../models/working-time.model';
import { SalonsService } from '../../services/salons.service';
import { WorkingTimesService } from '../../services/working-times.service';

@Component({
    selector: 'app-salon-details-page',
    templateUrl: './salon-details-page.component.html',
    styleUrl: './salon-details-page.component.scss',
})
export class SalonDetailsPageComponent implements OnInit {
    salon!: Salon | null;
    workingTime!: WorkingTime;
    workers!: Worker[];

    constructor(
        private salonsService: SalonsService,
        private workersService: WorkersService,
        private workingTimesService: WorkingTimesService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        public currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.fetchSalon();
    }

    fetchSalon(): void {
        const observer = {
            next: (salon: Salon) => {
                this.salon = salon;
                this.fetchWorkingTime();
                this.fetchWorkers();
                console.log(salon);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar
                    .open(getErrorMessages(httpError), 'Close')
                    .afterDismissed()
                    .subscribe(() => this.router.navigate(['main/salons']));
            },
        };

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const salonId = params.get(idRouteParameterName) ?? '';
                    return this.salonsService.getById(salonId);
                }),
            )
            .subscribe(observer);
    }

    fetchWorkingTime(): void {
        const observer = {
            next: (workingTime: WorkingTime) => {
                this.workingTime = workingTime;
            },
            error: (httpError: HttpErrorResponse) => {
                console.log();
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.workingTimesService
            .getWorkingTimeById(this.salon!.workingTimeId)
            .subscribe(observer);
    }

    fetchWorkers(): void {
        const observer = {
            next: (workers: Worker[]) => {
                this.workers = workers ?? [];
                console.log(workers);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.workersService.getMany(this.salon!.workers).subscribe(observer);
    }
}
