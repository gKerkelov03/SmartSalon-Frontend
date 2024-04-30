import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../models/validation-error.model';

export function getErrorMessage(error: HttpErrorResponse) {
    const firstError: ValidationError | string = error.error.errors[0];
    console.log(error);
    if (typeof firstError === 'string') {
        return firstError;
    } else {
        return firstError['validationViolations'][0];
    }
}
