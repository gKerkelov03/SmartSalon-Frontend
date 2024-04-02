import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmValidator(
	mustMatch: AbstractControl,
	mustMatchName: string
): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value !== mustMatch.value
			? { mismatch: { targetControlName: mustMatchName } }
			: null;
	};
}
