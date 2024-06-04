import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-update-salon-form',
    templateUrl: './update-salon-form.component.html',
    styleUrl: './update-salon-form.component.scss',
})
export class UpdateSalonFormComponent {
    @Input()
    salon!: Salon;
    isEditing: boolean = false;
    updateSalonForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public user: CurrentUserService,
        public salonsService: SalonsService,
    ) {}

    get googleMapsLocationControl(): AbstractControl | null {
        return this.updateSalonForm.get('googleMapsLocation');
    }

    get timePenaltyControl(): AbstractControl | null {
        return this.updateSalonForm.get('timePenalty');
    }

    get bookingsInAdvanceControl(): AbstractControl | null {
        return this.updateSalonForm.get('bookingsInAdvance');
    }

    get subscriptionsEnabledControl(): AbstractControl | null {
        return this.updateSalonForm.get('subscriptionsEnabled');
    }

    get workersCanMoveBookingsControl(): AbstractControl | null {
        return this.updateSalonForm.get('workersCanMoveBookings');
    }

    get workersCanDeleteBookingsControl(): AbstractControl | null {
        return this.updateSalonForm.get('workersCanDeleteBookings');
    }

    get workersCanSetNonWorkingPeriodsControl(): AbstractControl | null {
        return this.updateSalonForm.get('workersCanSetNonWorkingPeriods');
    }

    get latitudeControl(): AbstractControl | null {
        return this.updateSalonForm.get('latitude');
    }

    get longitudeControl(): AbstractControl | null {
        return this.updateSalonForm.get('longitude');
    }

    ngOnInit(): void {
        this.setupTheUpdateSalonForm();
    }

    saveClicked(): void {
        const observer = {
            next: () => {},
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };
    }

    cancel(): void {
        this.setupTheUpdateSalonForm();
    }

    setupTheUpdateSalonForm(): void {
        this.updateSalonForm = this.formBuilder.group({
            googleMapsLocation: new FormControl(
                this.salon?.googleMapsLocation,
                [Validators.required, Validators.minLength(10)],
            ),
            timePenalty: new FormControl(this.salon?.timePenalty, [
                Validators.required,
            ]),
            bookingsInAdvance: new FormControl(this.salon?.bookingsInAdvance, [
                Validators.required,
            ]),
            subscriptionsEnabled: new FormControl(
                this.salon?.subscriptionsEnabled,
                [Validators.required],
            ),
            workersCanMoveBookings: new FormControl(
                this.salon?.workersCanMoveBookings,
                [Validators.required],
            ),
            workersCanDeleteBookings: new FormControl(
                this.salon?.workersCanDeleteBookings,
                [Validators.required],
            ),
            workersCanSetNonWorkingPeriods: new FormControl(
                this.salon?.workersCanSetNonWorkingPeriods,
                [Validators.required],
            ),
        });

        if (this.user.isAdmin) {
            this.updateSalonForm.addControl(
                'latitude',
                new FormControl(this.salon.latitude, [Validators.required]),
            );

            this.updateSalonForm.addControl(
                'longitude',
                new FormControl(this.salon.longitude, [Validators.required]),
            );
        }
    }
}
