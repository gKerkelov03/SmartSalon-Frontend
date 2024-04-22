import { ValidatorFn } from '@angular/forms';

export type Credential = {
    name: string;
    validators: ValidatorFn[];
    isPassword?: boolean;
};
