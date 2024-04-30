import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

export const loggedOutGuard: CanActivateFn = () => {
    const router = inject(Router);
    const currentUserService = inject(CurrentUserService);

    return currentUserService.currentUserObservable.pipe(
        map((user) => {
            if (user === null) {
                return true;
            }

            router.navigate(['/main']);
            return false;
        })
    );
};
