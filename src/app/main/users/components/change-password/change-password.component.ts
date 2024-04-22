import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { passwordRegex } from '../../../../core/constants/regexes';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { HasUpdateCredentialObserver } from '../../abstractions/has-update-credential-observer';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { Credential } from '../../models/credential.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends HasUpdateCredentialObserver {
    title: string = 'Change your password';
    credential: Credential = {
        name: 'password',
        validators: [Validators.required, Validators.pattern(passwordRegex)],
        isPassword: true,
    };

    constructor(
        private usersService: UsersService,
        currentUserService: CurrentUserService,
        snackBar: MatSnackBar
    ) {
        super(snackBar, currentUserService);
    }

    submit(formData: ChangeCredentialSubmitResult): void {
        this.usersService
            //TODO: check the empty strings
            .changePassword(
                this.currentUserService.currentUser?.id ?? '',
                formData.currentPassword,
                formData?.credential ?? ''
            )
            .pipe(take(1))
            .subscribe(this.updateCredentialObserver);
    }
}
