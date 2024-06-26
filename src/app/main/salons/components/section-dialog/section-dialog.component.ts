import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CrudAction } from '../../../../core/enums/crud-action';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { Section } from '../../models/section.model';
import { SectionsService } from '../../services/sections.service';

@Component({
    selector: 'app-section-dialog',
    templateUrl: './section-dialog.component.html',
    styleUrl: './section-dialog.component.scss',
})
export class SectionDialogComponent {
    nameControl!: FormControl;
    pictureControl!: FormControl;

    CrudAction = CrudAction;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            section?: Section;
            salonId: string;
            action: CrudAction;
            canDelete: boolean;
        },
        private dialogRef: MatDialogRef<SectionDialogComponent>,
        private sectionsService: SectionsService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.setupTheFormControls();
    }

    setupTheFormControls(): void {
        this.nameControl = new FormControl(this.dialogData.section?.name, [
            Validators.required,
        ]);

        this.pictureControl = new FormControl(
            isValidUrl(this.dialogData.section?.pictureUrl)
                ? this.dialogData.section?.pictureUrl
                : blankProfilePictureUrl,
            [Validators.required],
        );
    }

    saveClicked(): void {
        if (this.dialogData.action === CrudAction.Update) {
            const observer = {
                next: () => {
                    this.dialogData.section!.name = this.nameControl.value;
                    this.dialogData.section!.pictureUrl =
                        this.pictureControl.value;

                    this.dialogRef.close({
                        section: this.dialogData.section,
                        action: this.dialogData.action,
                    });
                },
                error: () =>
                    this.snackBar.open(
                        'Section with this name already exists',
                        'Close',
                    ),
            };

            this.sectionsService
                .update(
                    this.dialogData.section!.id,
                    {
                        ...this.dialogData.section!,
                        pictureUrl: this.pictureControl.value,
                        name: this.nameControl.value,
                    },
                    this.dialogData.salonId,
                )
                .subscribe(observer);
        } else if (this.dialogData.action === CrudAction.Create) {
            const observer = {
                next: (section: Section) => {
                    this.dialogRef.close({
                        section,
                        action: this.dialogData.action,
                    });
                },
                error: () =>
                    this.snackBar.open(
                        'Section with this name already exist',
                        'Close',
                    ),
            };

            this.sectionsService
                .create(
                    this.nameControl.value,
                    this.pictureControl.value,
                    this.dialogData.salonId,
                )
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.sectionsService.getById(
                            response.createdResourceId,
                        ),
                    ),
                )
                .subscribe(observer);
        }
    }

    pictureUploaded(pictureUrl: string): void {
        this.pictureControl?.setValue(pictureUrl);
    }

    deleteClicked(): void {
        this.dialogRef.close({
            section: this.dialogData.section,
            action: CrudAction.Delete,
        });
    }
}
