import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatStepper } from '@angular/material/stepper';
import { passwordRegex } from '../../../../core/constants/regexes';
import { ChangeCredentialSubmitResult } from '../../models/change-credential-submit-result.model';
import { Credential } from '../../models/credential.model';

@Component({
    selector: 'app-change-credential',
    templateUrl: './change-credential.component.html',
    styleUrls: ['./change-credential.component.scss'],
})
export class ChangeCredentialComponent implements OnInit {
    credentialForm!: FormGroup | null;
    currentPasswordForm!: FormGroup;
    isCurrentPasswordVisible: boolean = false;
    isCredentialVisible: boolean = false;
    @Input() credential!: Credential | null;
    @Input() title!: string;
    @Output() submitted = new EventEmitter<ChangeCredentialSubmitResult>();
    @ViewChild('expansionPanel') expansionPanel!: MatExpansionPanel;
    @ViewChild('stepper') stepper!: MatStepper;

    constructor(private formBuilder: FormBuilder) {}

    get credentialControl(): AbstractControl | null {
        return this.credentialForm?.get('credential') ?? null;
    }

    get currentPasswordControl(): AbstractControl | null {
        return this.currentPasswordForm.get('currentPassword');
    }

    ngOnInit(): void {
        this.currentPasswordForm = this.formBuilder.group({
            currentPassword: new FormControl('', [
                Validators.required,
                Validators.pattern(passwordRegex),
            ]),
        });

        if (this.credential) {
            this.credentialForm = this.formBuilder.group({
                credential: new FormControl('', this.credential.validators),
            });
        }
    }

    cancelButtonClicked(): void {
        this.expansionPanel.expanded = false;
        this.stepper.reset();
    }

    submit(): void {
        const dataToEmit = {
            currentPassword: this.currentPasswordControl?.value,
            credential: this.credentialControl?.value,
        };

        this.submitted.emit(dataToEmit);
    }

    togglePasswordVisibility(): void {
        this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible;
    }

    toggleCredentialVisibility(): void {
        this.isCredentialVisible = !this.isCredentialVisible;
    }
}
