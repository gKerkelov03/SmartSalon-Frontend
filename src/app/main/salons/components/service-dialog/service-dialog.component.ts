import { Component, Inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { IsNotEmptyArrayValidator } from '../../../../core/utils/validators/is-not-empty-array.validator';
import { Category } from '../../models/category.model';
import { JobTitle } from '../../models/job-title.model';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component({
    selector: 'app-service-dialog',
    templateUrl: './service-dialog.component.html',
    styleUrl: './service-dialog.component.scss',
})
export class ServiceDialogComponent {
    serviceForm!: FormGroup;

    get nameControl(): AbstractControl {
        return this.serviceForm.get('name')!;
    }

    get descriptionControl(): AbstractControl {
        return this.serviceForm.get('description')!;
    }

    get priceControl(): AbstractControl {
        return this.serviceForm.get('price')!;
    }

    get durationControl(): AbstractControl {
        return this.serviceForm.get('durationInMinutes')!;
    }

    get jobTitlesControl(): AbstractControl {
        return this.serviceForm.get('jobTitlesNames')!;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            service?: Service;
            salonId: string;
            category: Category;
            jobTitles: JobTitle[];
            action: CrudAction;
        },
        private dialogRef: MatDialogRef<ServiceDialogComponent>,
        private servicesService: ServicesService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.setupTheServiceForm();
    }

    setupTheServiceForm(): void {
        const service = this.dialogData.service;

        this.serviceForm = this.formBuilder.group({
            name: new FormControl(service?.name, [Validators.required]),
            description: new FormControl(service?.description, [
                Validators.required,
            ]),
            price: new FormControl(service?.price, [Validators.required]),
            durationInMinutes: new FormControl(service?.durationInMinutes, [
                Validators.required,
            ]),
            salonId: new FormControl(this.dialogData.salonId, [
                Validators.required,
            ]),
            categoryId: new FormControl(this.dialogData.category.id, [
                Validators.required,
            ]),
            order: new FormControl(service?.order, []),
            jobTitlesNames: new FormControl(
                service
                    ? service?.jobTitles.map((jobTitle) => jobTitle.name)
                    : [],
                [IsNotEmptyArrayValidator()],
            ),
        });
    }

    saveClicked(): void {
        const newService = this.serviceForm.value;
        const jobTitlesIds = this.dialogData.jobTitles
            .filter((jobTitle) =>
                newService.jobTitlesNames.includes(jobTitle.name),
            )
            .map((jobTitle) => jobTitle.id);

        const newServiceJobTitles = jobTitlesIds.map((jobTitleId: string) =>
            this.dialogData.jobTitles.find(
                (jobTitle) => jobTitle.id === jobTitleId,
            ),
        );

        newService.jobTitlesIds = jobTitlesIds;

        if (this.dialogData.action === CrudAction.Update) {
            this.servicesService
                .update(this.dialogData.service!.id, this.serviceForm.value)
                .subscribe(() => {
                    this.dialogRef.close({
                        service: {
                            ...newService,
                            id: this.dialogData.service?.id,
                            jobTitles: newServiceJobTitles,
                        },
                        action: this.dialogData.action,
                    });

                    this.snackBar.open('Service updated successfully', 'OK');
                });
        } else if (this.dialogData.action === CrudAction.Create) {
            const observer = {
                next: (service: Service) => {
                    this.dialogRef.close({
                        service: {
                            ...service,
                            jobTitles: newServiceJobTitles,
                        },
                        action: this.dialogData.action,
                    });
                },
                error: () =>
                    this.snackBar.open(
                        'Service with this name already exist',
                        'Close',
                    ),
            };

            this.servicesService
                .create(this.serviceForm.value)
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.servicesService.getById(
                            response.createdResourceId,
                        ),
                    ),
                )
                .subscribe(observer);
        }
    }

    deleteClicked(): void {
        this.dialogRef.close({
            service: this.dialogData.service,
            action: CrudAction.Delete,
        });
    }
}
