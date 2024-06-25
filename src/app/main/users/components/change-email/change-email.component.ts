import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { Credential } from '../../models/credential.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-change-email',
    templateUrl: './change-email.component.html',
    styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent {
    title: string = 'Change your email';
    credential: Credential = {
        name: 'email',
        validators: [Validators.required, Validators.email],
        isPassword: false,
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
                this.snackBar.open('Confirm your new email', 'Close');
                this.resetSubject.next({});
            },
            error: (httpError: HttpErrorResponse) => {
                if (httpError.status === 401) {
                    this.snackBar.open('Wrong password', 'Close');
                }
            },
        };

        this.usersService
            .sendEmailConfirmation(
                this.currentUser.currentUser!.id,
                formData.currentPassword,
                formData.credential,
            )
            .subscribe(observer);
    }
}
