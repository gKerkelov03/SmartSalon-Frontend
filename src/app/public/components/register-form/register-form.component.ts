import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordRegex } from '../../../core/constants/regexes';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { AuthService } from '../../../core/services/auth.service';
import { AreMatchingValidator } from '../../../core/utils/validators/matching.validator';
import { Salon } from '../../../main/salons/models/salon.model';
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
    salon!: Salon;
    registerForm!: FormGroup;
    genders: string[] = ['male', 'female'];
    isPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private ownersService: OwnersService,
        private workersService: WorkersService,
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

    ngOnInit(): void {
        this.setupTheRegisterForm();
        this.checkIfConfirmPasswordIsValidEveryTimePasswordChanges();
    }

    onSubmit(): void {
        return;
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
            salonId: new FormControl(this.salon?.id, []),
            jobTitles: new FormControl([], []),
        });
    }

    checkIfConfirmPasswordIsValidEveryTimePasswordChanges(): void {
        this.passwordControl?.valueChanges.subscribe(() =>
            this.confirmPasswordControl?.updateValueAndValidity(),
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
