import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { idRouteParameterName } from '../../../../core/constants/routing';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Owner } from '../../../users/models/owner.model';
import { User } from '../../../users/models/user.model';
import { Worker } from '../../../users/models/worker.model';
import { OwnersService } from '../../../users/services/owners.service';
import { WorkersService } from '../../../users/services/workers.service';
import { Salon } from '../../models/salon.model';
import { Section } from '../../models/section.model';
import { WorkingTime } from '../../models/working-time.model';
import { SalonsService } from '../../services/salons.service';
import { SectionsService } from '../../services/sections.service';
import { WorkingTimesService } from '../../services/working-times.service';

@Component({
    selector: 'app-salon-details-page',
    templateUrl: './salon-details-page.component.html',
    styleUrl: './salon-details-page.component.scss',
})
export class SalonDetailsPageComponent implements OnInit {
    salon!: Salon | null;
    workingTime!: WorkingTime;
    workers: Worker[] = [];
    owners: Owner[] = [];
    sections: Section[] = [];
    user: Worker | Owner | User = this.currentUser.currentUser!;

    constructor(
        private salonsService: SalonsService,
        private workersService: WorkersService,
        private ownersService: OwnersService,
        private sectionsService: SectionsService,
        private workingTimesService: WorkingTimesService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        public currentUser: CurrentUserService,
    ) {}

    ngOnInit(): void {
        this.fetchSalon();
        this.fetchCurrentUser();
    }

    fetchSalon(): void {
        const observer = {
            next: (salon: Salon) => {
                this.salon = salon;
                this.fetchWorkingTime();
                this.fetchWorkers();
                this.fetchOwners();
                this.fetchSections();
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar
                    .open(getErrorMessages(httpError), 'OK')
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
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.workersService.getMany(this.salon!.workers).subscribe(observer);
    }

    fetchOwners(): void {
        const observer = {
            next: (owners: Owner[]) => {
                this.owners = owners ?? [];
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.ownersService.getMany(this.salon!.owners).subscribe(observer);
    }

    fetchCurrentUser(): void {
        const observer = {
            next: (user: Worker | Owner) => {
                this.user = user;
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        if (this.currentUser.isWorker) {
            this.workersService
                .getById(this.currentUser.currentUser!.id)
                .subscribe(observer);
        } else if (this.currentUser.isOwner) {
            this.ownersService
                .getById(this.currentUser.currentUser!.id)
                .subscribe(observer);
        }
    }

    fetchSections(): void {
        const observer = {
            next: (sections: Section[]) => {
                this.sections = sections ?? [];
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.sectionsService.getMany(this.salon!.sections).subscribe(observer);
    }

    get isAdminOrOwner(): boolean {
        return this.currentUser.isAdmin || this.currentUser.isOwner;
    }
}
