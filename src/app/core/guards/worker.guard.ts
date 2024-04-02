import { CanActivateFn } from '@angular/router';

export const workerGuard: CanActivateFn = (route, state) => {
  return true;
};
