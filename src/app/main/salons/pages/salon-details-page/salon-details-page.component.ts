import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { idRouteParameterName } from '../../../../core/constants/routing';
import { getErrorMessage } from '../../../../core/utils/get-error-message';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-salon-details-page',
    templateUrl: './salon-details-page.component.html',
    styleUrl: './salon-details-page.component.scss',
})
export class SalonDetailsPageComponent implements OnInit {
    salonToDisplay!: Salon | null;

    constructor(
        private salonsService: SalonsService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.fetchSalonToDisplay();
    }

    fetchSalonToDisplay(): void {
        const observer = {
            next: (salon: Salon) => (this.salonToDisplay = salon),
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessage(httpError), 'Close');
            },
        };

        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const salonId = params.get(idRouteParameterName) ?? '';
                    return this.salonsService.getById(salonId);
                })
            )
            .subscribe(observer);
    }
}
