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
import { switchMap } from 'rxjs';
import { jwtTokenKey } from '../../../core/constants/local-storage-keys';
import { passwordRegex } from '../../../core/constants/regexes';
import { JwtData } from '../../../core/models/jwt-data.model';
import { LoginResponse } from '../../../core/models/login-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { parseJwt } from '../../../core/utils/parse-jwt';
import { User } from '../../../main/users/models/user.model';
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
        private currentUser: CurrentUserService,
        private usersService: UsersService,
        private localStorage: LocalStorageService,
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

    requireConfirmedEmail(user: User): void {
        if (!user.emailConfirmed) {
            this.snackBar.open('Please confirm your email before you log in');
            return;
        }

        this.logTheUserIn(user);
    }

    logTheUserIn(user: User): void {
        this.currentUser.setCurrentUser(user);
        this.router.navigate(['main']);
    }

    onSubmit(): void {
        const observer = {
            next: (user: User) => {
                // this.requireConfirmedEmail(user);

                //TODO: change this to requireConfirmedEmail(user)
                this.logTheUserIn(user);
            },
            error: () => {
                this.snackBar.open('Invalid credentials', 'Close');
            },
        };

        this.authService
            .login(this.loginForm.value)
            .pipe(
                switchMap((response: LoginResponse) => {
                    var decodedJwt: JwtData = parseJwt(response.jwtToken);
                    this.localStorage.setItem(jwtTokenKey, response.jwtToken);

                    return this.usersService.getById(decodedJwt.sub);
                }),
            )
            .subscribe(observer);
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
}
