import { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, take } from 'rxjs';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { getErrorMessage } from '../../../../core/utils/get-error-message';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-personal-information-form',
    templateUrl: './personal-information-form.component.html',
    styleUrls: ['./personal-information-form.component.scss'],
})
export class PersonalInformationFormComponent implements OnInit, OnDestroy {
    @Input() canEdit!: boolean;
    @Output() setCanEditToFalse = new EventEmitter();
    userTemplate!: User | null;
    personalInformationForm!: FormGroup;
    genders: string[] = ['male', 'female'];
    allSubscriptions: Subscription[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private usersService: UsersService,
        private currentUserService: CurrentUserService
    ) {}

    get firstNameControl(): AbstractControl | null {
        return this.personalInformationForm.get('firstName');
    }

    get lastNameControl(): AbstractControl | null {
        return this.personalInformationForm.get('lastName');
    }

    get phoneNumberControl(): AbstractControl | null {
        return this.personalInformationForm.get('phoneNumber');
    }

    ngOnInit(): void {
        this.userTemplate = this.currentUserService.currentUser;
        this.setupThePersonalInformationForm();
    }

    ngOnDestroy(): void {
        this.allSubscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    saveClicked(): void {
        const observer = {
            next: () => {},
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessage(httpError), 'Close');
            },
        };

        this.usersService
            .update(
                this.currentUserService.currentUser!.id,
                this.personalInformationForm.value
            )
            .pipe(take(1))
            .subscribe(observer);

        this.setCanEditToFalse.emit();
    }

    cancel(): void {
        this.setupThePersonalInformationForm();
        this.setCanEditToFalse.emit();
    }

    setupThePersonalInformationForm(): void {
        this.personalInformationForm = this.formBuilder.group({
            firstName: new FormControl(this.userTemplate?.firstName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
            lastName: new FormControl(this.userTemplate?.lastName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(25),
            ]),
            phoneNumber: new FormControl(this.userTemplate?.phoneNumber, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(25),
            ]),
        });
    }

    changeProfilePicture(newProfilePictureUrl: string): void {
        var updateObserver = {
            next: () => {
                this.userTemplate = Object.assign({}, this.userTemplate);
                this.currentUserService.setCurrentUser(this.userTemplate);
            },
            error: (httpError: HttpErrorResponse) =>
                this.snackBar.open(httpError.error.message, 'Close', {
                    panelClass: 'round-white-background',
                }),
        };

        this.usersService
            .update(this.currentUserService.currentUser!.id, {
                profilePictureUrl: newProfilePictureUrl,
            })
            .pipe(take(1))
            .subscribe(updateObserver);
    }
}
