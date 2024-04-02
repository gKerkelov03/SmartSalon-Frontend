import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: HttpErrorResponse) {
	let errors = error.error.errors;

	if (errors) {
		return Object.values(errors)[0] + '';
	}

	return error.error;
}
