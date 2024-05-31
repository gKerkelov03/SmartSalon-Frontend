import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { passwordRegex } from '../../../core/constants/regexes';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { getErrorMessages } from '../../../core/utils/get-error-message';
import { IsNotEmptyArrayValidator } from '../../../core/utils/validators/is-not-empty-array.validator';
import { AreMatchingValidator } from '../../../core/utils/validators/matching.validator';
import { AddOwnerDialogComponent } from '../../../main/salons/components/add-owner-dialog/add-owner-dialog.component';
import { AddWorkerDialogComponent } from '../../../main/salons/components/add-worker-dialog/add-worker-dialog.component';
import { JobTitle } from '../../../main/salons/models/job-title.model';
import { Owner } from '../../../main/users/models/owner.model';
import { Worker } from '../../../main/users/models/worker.model';
import { OwnersService } from '../../../main/users/services/owners.service';
import { WorkersService } from '../../../main/users/services/workers.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    @Input()
    isRegisteringOwner!: boolean;
    @Input()
    isRegisteringWorker!: boolean;
    @Input()
    salonId!: string;
    @Input()
    jobTitles!: JobTitle[];
    registerForm!: FormGroup;
    genders: string[] = ['male', 'female'];
    isPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private ownersService: OwnersService,
        private workersService: WorkersService,
        @Optional()
        private addWorkerDialogRef: MatDialogRef<AddWorkerDialogComponent>,
        @Optional()
        private addOwnerDialogRef: MatDialogRef<AddOwnerDialogComponent>,
        private snackBar: MatSnackBar,
        private router: Router,
    ) {}

    get profilePictureControl(): AbstractControl | null {
        return this.registerForm.get('profilePictureUrl');
    }

    get firstNameControl(): AbstractControl | null {
        return this.registerForm.get('firstName');
    }

    get lastNameControl(): AbstractControl | null {
        return this.registerForm.get('lastName');
    }

    get emailControl(): AbstractControl | null {
        return this.registerForm.get('email');
    }

    get passwordControl(): AbstractControl | null {
        return this.registerForm.get('password');
    }

    get confirmPasswordControl(): AbstractControl | null {
        return this.registerForm.get('confirmPassword');
    }

    get phoneNumberControl(): AbstractControl | null {
        return this.registerForm.get('phoneNumber');
    }

    get jobTitlesNamesControl(): AbstractControl | null {
        return this.registerForm.get('jobTitlesNames');
    }

    ngOnInit(): void {
        this.setupTheRegisterForm();
        this.checkIfConfirmPasswordIsValidEveryTimePasswordChanges();
    }

    onSubmit(): void {
        const userInfo = this.registerForm.value;
        const createWorkerObserver = {
            next: (worker: Worker) => this.addWorkerDialogRef.close({ worker }),
            error: (error: HttpErrorResponse) =>
                this.snackBar.open(getErrorMessages(error), 'Close'),
        };

        const createOwnerObserver = {
            next: (owner: Owner) => this.addOwnerDialogRef.close({ owner }),
            error: (error: HttpErrorResponse) =>
                this.snackBar.open(getErrorMessages(error), 'Close'),
        };

        const createCustomerObserver = {
            next: () => {
                this.router.navigate(['/public/login']);
                this.snackBar.open('Your account is created, please login');
            },
            error: (error: HttpErrorResponse) =>
                this.snackBar.open(getErrorMessages(error), 'Close'),
        };

        if (this.isRegisteringWorker) {
            const jobTitlesIds = this.jobTitles
                .filter((jobTitle) =>
                    this.jobTitlesNamesControl?.value.includes(jobTitle.name),
                )
                .map((jobTitle) => jobTitle.id);

            userInfo.jobTitlesIds = jobTitlesIds;
        }

        if (this.isRegisteringWorker) {
            this.workersService
                .create(userInfo)
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.workersService.getById(response.createdResourceId),
                    ),
                )
                .subscribe(createWorkerObserver);
        } else if (this.isRegisteringOwner) {
            console.log(123);
            this.ownersService
                .create(userInfo)
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.ownersService.getById(response.createdResourceId),
                    ),
                )
                .subscribe(createOwnerObserver);
        } else {
            this.authService
                .register(userInfo)
                .subscribe(createCustomerObserver);
        }
    }

    setupTheRegisterForm(): void {
        this.registerForm = this.formBuilder.group({
            profilePictureUrl: new FormControl(blankProfilePictureUrl),
            firstName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(passwordRegex),
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                AreMatchingValidator('password'),
            ]),
            phoneNumber: new FormControl('', [Validators.required]),
            salonId: new FormControl(this.salonId, []),
        });

        if (this.isRegisteringWorker) {
            this.registerForm.addControl(
                'jobTitlesNames',
                new FormControl([], [IsNotEmptyArrayValidator]),
            );
        }
    }

    checkIfConfirmPasswordIsValidEveryTimePasswordChanges(): void {
        this.passwordControl?.valueChanges.subscribe(() =>
            this.confirmPasswordControl?.updateValueAndValidity(),
        );
    }

    updateProfilePicture(newUrl: string): void {
        if (newUrl) {
            this.profilePictureControl?.setValue(newUrl);
        }
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
}
