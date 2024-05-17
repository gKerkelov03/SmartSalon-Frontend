import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Salon } from '../../models/salon.model';
import { SalonsService } from '../../services/salons.service';

@Component({
    selector: 'app-salon-info-form',
    templateUrl: './salon-info-form.component.html',
    styleUrl: './salon-info-form.component.scss',
})
export class SalonInfoFormComponent {
    @Input() canEdit!: boolean;
    @Output() setCanEditToFalse = new EventEmitter();
    salonTemplate!: Salon;
    basicInfoForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private salonsService: SalonsService,
    ) {}

    get nameControl(): AbstractControl | null {
        return this.basicInfoForm.get('firstName');
    }

    get descriptionControl(): AbstractControl | null {
        return this.basicInfoForm.get('description');
    }

    get bookingsInAdvance(): AbstractControl | null {
        return this.basicInfoForm.get('bookingsInAdvance');
    }

    get timePenalty(): AbstractControl | null {
        return this.basicInfoForm.get('timePenalty');
    }

    ngOnInit(): void {
        this.setupTheBasicInfoForm();
    }

    saveClicked(): void {
        const observer = {
            next: () => {},
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.salonsService
            .update(this.salonTemplate.id, this.basicInfoForm.value)
            .pipe(take(1))
            .subscribe(observer);

        this.setCanEditToFalse.emit();
    }

    cancel(): void {
        this.setupTheBasicInfoForm();
        this.setCanEditToFalse.emit();
    }

    setupTheBasicInfoForm(): void {
        this.basicInfoForm = this.formBuilder.group({
            name: new FormControl(this.salonTemplate.name, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
            description: new FormControl(this.salonTemplate.description, [
                Validators.required,
            ]),
            bookingsInAdvance: new FormControl(
                this.salonTemplate.bookingsInAdvance,
                [Validators.required],
            ),
            timePenalty: new FormControl(this.salonTemplate.timePenalty, [
                Validators.required,
            ]),
        });
    }

    changeProfilePicture(newProfilePictureUrl: string): void {
        const updateObserver = {
            next: () => {
                this.salonTemplate = Object.assign({}, this.salonTemplate);
            },
            error: (httpError: HttpErrorResponse) =>
                this.snackBar.open(
                    getErrorMessages(httpError.error.message),
                    'Close',
                ),
        };

        this.salonsService
            .update(this.salonTemplate.id, {
                profilePictureUrl: newProfilePictureUrl,
            })
            .pipe(take(1))
            .subscribe(updateObserver);
    }
}
