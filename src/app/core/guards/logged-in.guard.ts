import { CanActivateFn } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
    // const urlTree = inject(Router).navigate(['/public/landing-page']);
    return true;
};
