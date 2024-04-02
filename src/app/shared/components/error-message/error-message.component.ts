import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
	@Input() control: AbstractControl | AbstractControlDirective | null = null;
	@Input() patternDescription: string | undefined;

	errorMessages: Record<string, (parameters?: any) => string> = {
		required: () => 'This field is required',
		maxlength: ({ requiredLength }: { requiredLength: number }) =>
			`Maximum ${requiredLength} characters are allowed`,
		minlength: ({ requiredLength }: { requiredLength: number }) =>
			`Minimum ${requiredLength} characters are required`,
		pattern: () => this.patternDescription || 'Invalid format',
		min: ({ min }: { min: number }) =>
			`The minimum allowed value is ${min}`,
		max: ({ max }: { max: number }) =>
			`The maximum allowed value is ${max}`,
		email: () => 'Incorrect email',
		whitespace: () => 'White spaces are not allowed',
		mismatch: ({ targetControlName }: { targetControlName: string }) =>
			`Must be the same as ${targetControlName}`,
		notEmptyArray: () => 'Required',
	};

	errorMessagesToShow(): string[] {
		const errorMessagesList: string[] = [],
			allErrors = this.control?.errors;

		if (allErrors && this.control?.touched) {
			for (const error in allErrors) {
				errorMessagesList.push(
					this.errorMessages[error](allErrors[error])
				);
			}
		}

		return errorMessagesList;
	}
}
