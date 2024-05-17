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
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { passwordRegex } from '../../../core/constants/regexes';
import { AuthService } from '../../../core/services/auth.service';
import { getErrorMessages } from '../../../core/utils/get-error-message';
import { UsersService } from '../../../main/users/services/users.service';

@Component({
    selector: 'app-restore-password-form',
    templateUrl: './restore-password-form.component.html',
    styleUrls: ['./restore-password-form.component.scss'],
})
export class RestorePasswordFormComponent implements OnInit {
    restorePasswordForm!: FormGroup;
    isPasswordVisible: boolean = false;
    token!: string;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private usersService: UsersService,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    get newPasswordControl(): AbstractControl | null {
        return this.restorePasswordForm.get('newPassword');
    }

    ngOnInit(): void {
        this.getTokenFromQueryParams();
        this.setupTheRestorePasswordForm();
    }

    getTokenFromQueryParams() {
        this.route.queryParams.subscribe(
            (params) => (this.token = params['token']),
        );
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
                this.router.navigate(['public/login']);

                this.snackBar.open(
                    'You resetted your password successfully!',
                    'Login',
                );
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.usersService
            .restorePassword(
                this.token,
                this.restorePasswordForm.value.newPassword,
            )
            .pipe(take(1))
            .subscribe(observer);
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
