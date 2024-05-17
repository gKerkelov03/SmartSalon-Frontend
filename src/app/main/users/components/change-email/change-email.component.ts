import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { HasUpdateCredentialObserver } from '../../abstractions/has-update-credential-observer';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { Credential } from '../../models/credential.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-change-email',
    templateUrl: './change-email.component.html',
    styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent extends HasUpdateCredentialObserver {
    title: string = 'Change your email';
    credential: Credential = {
        name: 'email',
        validators: [Validators.required, Validators.email],
    };

    constructor(
        private usersService: UsersService,
        currentUser: CurrentUserService,
        snackBar: MatSnackBar,
    ) {
        super(snackBar, currentUser);
    }

    submit(formData: ChangeCredentialSubmitResult): void {
        this.usersService
            //TODO: check the empty strings
            .sendEmailConfirmation(
                this.currentUser.currentUser?.id ?? '',
                formData.currentPassword,
                formData?.credential ?? '',
            )
            .pipe(take(1))
            .subscribe(this.updateCredentialObserver);
    }
}
