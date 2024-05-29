import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../models/validation-error.model';

export function getErrorMessages(error: HttpErrorResponse): string {
    const title: string = error.error?.title;
    const errors: (ValidationError | string)[] = error.error?.errors;
    const errorMessages: string = errors?.length ? errors.join(', ') : title;

    if (errorMessages) {
        return errorMessages;
    }

    return 'Unknown error';
}
