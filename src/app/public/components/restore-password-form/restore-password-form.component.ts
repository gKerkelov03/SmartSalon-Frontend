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
import { take } from 'rxjs';
import { passwordRegex } from '../../../core/constants/regexes';
import { LoginResponse } from '../../../core/models/login-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
    selector: 'app-restore-password-form',
    templateUrl: './restore-password-form.component.html',
    styleUrls: ['./restore-password-form.component.scss'],
})
export class RestorePasswordFormComponent implements OnInit {
    restorePasswordForm!: FormGroup;
    isPasswordVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private currentUserService: CurrentUserService
    ) {}

    get newPasswordControl(): AbstractControl | null {
        return this.restorePasswordForm.get('NewPassword');
    }

    ngOnInit(): void {
        this.restorePasswordForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(passwordRegex),
            ]),
        });
    }

    onSubmit(): void {
        const observer = {
            next: (user: LoginResponse) => {
                this.router.navigate(['main']);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open('Invalid credentials', 'Close', {
                    panelClass: 'round-white-background',
                });
            },
        };

        this.authService
            .login(this.restorePasswordForm.value)
            .pipe(take(1))
            .subscribe(observer);
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
