import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function AreMatchingValidator(targetControlName: string): ValidatorFn {
    return (sourceControl: AbstractControl): ValidationErrors | null => {
        const targetControl = sourceControl.parent?.get(targetControlName);

        return sourceControl.value !== targetControl?.value
            ? {
                  mismatch: {
                      targetControlName
                  }
              }
            : null;
    };
}
