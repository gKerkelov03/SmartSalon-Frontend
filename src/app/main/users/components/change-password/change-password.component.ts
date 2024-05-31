import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { passwordRegex } from '../../../../core/constants/regexes';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { Credential } from '../../models/credential.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
    title: string = 'Change your password';
    credential: Credential = {
        name: 'password',
        validators: [Validators.required, Validators.pattern(passwordRegex)],
        isPassword: true,
    };
    resetSubject = new Subject();

    constructor(
        private usersService: UsersService,
        private currentUser: CurrentUserService,
        private snackBar: MatSnackBar,
    ) {}

    submit(formData: ChangeCredentialSubmitResult): void {
        const observer = {
            next: () => {
                this.snackBar.open('Your password was changed', 'Close');
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(
                    getErrorMessages(httpError.error.message),
                    'Close',
                );
            },
        };

        this.usersService
            .changePassword(
                this.currentUser.currentUser!.id,
                formData.currentPassword,
                formData.credential,
            )
            .subscribe(observer);
    }
}
