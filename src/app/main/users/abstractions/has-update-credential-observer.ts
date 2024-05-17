import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrentUserService } from '../../../core/services/current-user.service';
import { getErrorMessages } from '../../../core/utils/get-error-message';

export abstract class HasUpdateCredentialObserver {
    constructor(
        private snackBar: MatSnackBar,
        protected currentUser: CurrentUserService,
    ) {}

    public updateCredentialObserver = {
        //TODO: might need to get the updated user here
        next: () => {
            // this.currentUser.setCurrentUser(updatedUser);
            this.snackBar.open('Your change was successfull!', 'Close');
        },
        error: (httpError: HttpErrorResponse) => {
            this.snackBar.open(
                getErrorMessages(httpError.error.message),
                'Close',
            );
        },
    };
}
