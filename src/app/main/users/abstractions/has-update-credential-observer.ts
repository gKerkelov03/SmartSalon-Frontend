import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../../core/services/current-user.service';

export abstract class HasUpdateCredentialObserver {
    constructor(
        private snackBar: MatSnackBar,
        protected currentUserService: CurrentUserService
    ) {}

    public updateCredentialObserver = {
        //TODO: might need to get the updated user here
        next: () => {
            // this.currentUserService.setCurrentUser(updatedUser);
            this.snackBar.open('Your change was successfull!', 'Close');
        },
        error: (httpError: HttpErrorResponse) => {
            this.snackBar.open(httpError.error.message, 'Close');
        },
    };
}
