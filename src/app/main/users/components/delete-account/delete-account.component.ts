import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent {
    title: string = 'Change your password';

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private currentUserService: CurrentUserService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    submit(formData: ChangeCredentialSubmitResult): void {
        const currentUser = this.currentUserService.currentUser;

        const deleteObserver = {
            next: () => {
                this.currentUserService.clearCurrentUser();
                this.authService.logout();
                this.router.navigate(['public']);
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(httpError.error.message, 'Close', {
                    panelClass: 'round-white-background',
                });
            },
        };

        this.usersService
            .delete(currentUser?.id ?? '', formData.currentPassword)
            .pipe(take(1))
            .subscribe(deleteObserver);
    }
}
