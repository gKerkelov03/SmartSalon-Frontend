import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsNotEmptyArrayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = Array.isArray(control.value) && control.value.length;

        return isValid
            ? null
            : {
                  notEmptyArray: true
              };
    };
}
