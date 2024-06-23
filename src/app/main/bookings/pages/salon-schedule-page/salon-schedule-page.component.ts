import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { idRouteParameterName } from '../../../../core/constants/routing';
import { Salon } from '../../../salons/models/salon.model';
import { SalonsService } from '../../../salons/services/salons.service';
import { Worker } from '../../../users/models/worker.model';
import { WorkersService } from '../../../users/services/workers.service';

@Component({
    selector: 'app-salon-schedule-page',
    templateUrl: './salon-schedule-page.component.html',
    styleUrl: './salon-schedule-page.component.scss',
})
export class SalonSchedulePageComponent implements OnInit {
    salon!: Salon;
    workers!: Worker[];
    selectedWorkerIndex: number = 0;

    constructor(
        private route: ActivatedRoute,
        private salonsService: SalonsService,
        private workersService: WorkersService,
    ) {}
    ngOnInit(): void {
        this.fetchSalon();
    }

    fetchSalon(): void {
        const observer = {
            next: (salon: Salon) => {
                this.salon = salon;
                this.fetchWorkers();
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

    fetchWorkers(): void {
        const observer = {
            next: (workers: Worker[]) => {
                this.workers = workers ?? [];
            },
            error: () => {},
        };

        this.workersService.getMany(this.salon!.workers).subscribe(observer);
    }

    workerIndexChanged(newIndex: number) {
        this.selectedWorkerIndex = newIndex;
    }
}
