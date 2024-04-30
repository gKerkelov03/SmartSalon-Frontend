import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, retry, switchMap, throwError } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

export const loggedOutGuard: CanActivateFn = () => {
    const router = inject(Router);
    const currentUserService = inject(CurrentUserService);

    return CurrentUserService.initialized.pipe(
        switchMap((initialized: boolean) => {
            if (!initialized) {
                return throwError(
                    () => new Error('CurrentUserService not initialized yet')
                );
            }

            return currentUserService.currentUserObservable;
        }),
        retry({ delay: 100 }),
        map((user) => {
            if (user === null) {
                return true;
            }

            router.navigate(['/main']);
            return false;
        })
    );
};
