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
import { switchMap, take } from 'rxjs';
import { passwordRegex } from '../../../core/constants/regexes';
import { JwtData } from '../../../core/models/jwt-data.model';
import { LoginResponse } from '../../../core/models/login-response.model';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { parseJwt } from '../../../core/utils/parse-jwt';
import { UsersService } from '../../../main/users/services/users.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    loginForm!: FormGroup;
    isPasswordVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private currentUserService: CurrentUserService,
        private usersService: UsersService,
        private localStorageService: LocalStorageService
    ) {}

    get emailControl(): AbstractControl | null {
        return this.loginForm.get('email');
    }

    get passwordControl(): AbstractControl | null {
        return this.loginForm.get('password');
    }

    ngOnInit(): void {
        this.setupTheLoginForm();
    }

    setupTheLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(passwordRegex),
            ]),
        });
    }

    onSubmit(): void {
        const observer = {
            next: (user: User) => {
                this.currentUserService.setCurrentUser(user);
                this.router.navigate(['main']);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open('Invalid credentials', 'Close');
            },
        };

        this.authService
            .login(this.loginForm.value)
            .pipe(take(1))
            .pipe(
                switchMap((response: LoginResponse) => {
                    var decodedJwt: JwtData = parseJwt(response.jwtToken);
                    return this.usersService.getById(decodedJwt.sub);
                })
            )
            .subscribe(observer);
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
