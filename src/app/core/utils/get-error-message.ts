import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: HttpErrorResponse) {
    const firstError = error.error.errors[0];

    if (typeof firstError === 'string') {
        return firstError;
    } else {
        return firstError['Description'];
    }
}
