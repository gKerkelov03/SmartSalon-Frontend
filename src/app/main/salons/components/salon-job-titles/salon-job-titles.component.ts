import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { JobTitle } from '../../models/job-title.model';
import { JobTitlesService } from '../../services/job-titles.service';

@Component({
    selector: 'app-salon-job-titles',
    templateUrl: './salon-job-titles.component.html',
    styleUrl: './salon-job-titles.component.scss',
})
export class SalonJobTitlesComponent {
    @ViewChild('jobTitlesInputs')
    jobTitlesInput!: ElementRef;
    @Input()
    canEdit: boolean = true;
    @Input()
    salonId!: string;
    @Input()
    jobTitles!: JobTitle[];

    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    constructor(
        private jobTitlesService: JobTitlesService,
        private snackBar: MatSnackBar,
    ) {}

    addJobTitle(event: MatChipInputEvent): void {
        const name = event.value;

        if (!name) {
            return;
        }

        const observer = {
            next: (jobTitle: JobTitle) => {
                this.jobTitles.push(jobTitle);
                this.jobTitlesInput.nativeElement.value = '';
            },
            error: (response: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(response), 'Close');
            },
        };

        this.jobTitlesService
            .create(name, this.salonId)
            .pipe(
                switchMap((response: CreatedResponse) =>
                    this.jobTitlesService.getById(response.createdResourceId),
                ),
            )
            .subscribe(observer);
    }

    editJobTitle(jobTitle: JobTitle, event: MatChipEditedEvent) {
        const value = event.value.trim();

        if (!value) {
            this.removeJobTitle(jobTitle);
            return;
        }

        const index = this.jobTitles.indexOf(jobTitle);

        if (index >= 0) {
            this.jobTitles[index].name = value;
        }

        this.jobTitlesService
            .update(value, this.salonId, jobTitle.id)
            .subscribe();
    }

    removeJobTitle(jobTitle: JobTitle): void {
        const observer = {
            next: () => {
                const index = this.jobTitles.indexOf(jobTitle);

                if (index >= 0) {
                    this.jobTitles.splice(index, 1);
                }
            },
            error: (error: HttpErrorResponse) =>
                this.snackBar.open(getErrorMessages(error)),
        };

        this.jobTitlesService
            .delete(jobTitle.id, this.salonId)
            .subscribe(observer);
    }
}
