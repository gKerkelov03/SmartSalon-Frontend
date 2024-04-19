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
import { AuthService } from '../../../core/services/auth.service';
import { getErrorMessage } from '../../../core/utils/get-error-message';

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
        private router: Router
    ) {}

    get newPasswordControl(): AbstractControl | null {
        return this.restorePasswordForm.get('newPassword');
    }

    ngOnInit(): void {
        this.setupTheRestorePasswordForm();
    }

    setupTheRestorePasswordForm() {
        this.restorePasswordForm = this.formBuilder.group({
            newPassword: new FormControl('', [
                Validators.required,
                Validators.pattern(passwordRegex),
            ]),
        });
    }

    onSubmit(): void {
        const observer = {
            next: () => {
                const snackBarRef = this.snackBar.open(
                    'You resetted you password successfully!',
                    'Login'
                );

                snackBarRef
                    .afterDismissed()
                    .pipe(take(1))
                    .subscribe(() => this.router.navigate(['public/login']));
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessage(httpError), 'Close');
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
