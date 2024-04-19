import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordRegex } from '../../../core/constants/regexes';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { RegisterResponse } from '../../../core/models/register-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { AreMatchingValidator } from '../../../core/utils/validators/matching.validator';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
    registerForm!: FormGroup;
    genders: string[] = ['male', 'female'];
    allSubscriptions: (Subscription | undefined)[] = [];
    isPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
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

    ngOnInit(): void {
        this.setupTheRegisterForm();
        this.checkIfConfirmPasswordIsValidEveryTimePasswordChanges();
    }

    ngOnDestroy(): void {
        this.allSubscriptions.forEach((subscription) =>
            subscription?.unsubscribe()
        );
    }

    onSubmit(): void {
        const observer = {
            next: (user: RegisterResponse) => {
                const snackBarRef = this.snackBar.open(
                    'You registered successfully!',
                    'Login',
                    { panelClass: 'round-white-background' }
                );

                this.allSubscriptions.push(
                    snackBarRef
                        .afterDismissed()
                        .subscribe(() => this.router.navigate(['public/login']))
                );
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(httpError.error.message, 'Close', {
                    panelClass: 'round-white-background',
                });
            },
        };

        this.allSubscriptions.push(
            this.authService
                .register(this.registerForm.value)
                .subscribe(observer)
        );
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
        });
    }

    checkIfConfirmPasswordIsValidEveryTimePasswordChanges(): void {
        this.allSubscriptions.push(
            this.passwordControl?.valueChanges.subscribe(() =>
                this.confirmPasswordControl?.updateValueAndValidity()
            )
        );
    }

    updateProfilePicture(newUrl: string): void {
        this.profilePictureControl?.setValue(newUrl);
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
}
