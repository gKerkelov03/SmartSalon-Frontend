import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { CreatedResponse } from '../../../../core/models/created-response.model';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-category-dialog',
    templateUrl: './category-dialog.component.html',
    styleUrl: './category-dialog.component.scss',
})
export class CategoryDialogComponent {
    nameControl!: FormControl;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            category?: Category;
            salonId: string;
            sectionId: string;
            action: CrudAction;
        },
        private dialogRef: MatDialogRef<CategoryDialogComponent>,
        private categoriesService: CategoriesService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.setupTheFormControls();
    }

    setupTheFormControls(): void {
        this.nameControl = new FormControl(this.dialogData.category?.name, [
            Validators.required,
        ]);
    }

    saveClicked(): void {
        if (this.dialogData.action === CrudAction.Update) {
            const observer = {
                next: () => {
                    this.dialogData.category!.name = this.nameControl.value;

                    this.dialogRef.close({
                        category: this.dialogData.category,
                        action: this.dialogData.action,
                    });
                },
                error: () =>
                    this.snackBar.open(
                        'Category with this name already exist',
                        'Close',
                    ),
            };

            this.categoriesService
                .update(
                    this.dialogData.category!.id,
                    {
                        ...this.dialogData.category!,
                        name: this.nameControl.value,
                    },
                    this.dialogData.salonId,
                )
                .subscribe(observer);
        } else if (this.dialogData.action === CrudAction.Create) {
            const observer = {
                next: (category: Category) => {
                    this.dialogRef.close({
                        category,
                        action: this.dialogData.action,
                    });
                },
                error: () =>
                    this.snackBar.open(
                        'Category with this name already exist',
                        'Close',
                    ),
            };

            this.categoriesService
                .create(
                    this.nameControl.value,
                    this.dialogData.sectionId,
                    this.dialogData.salonId,
                )
                .pipe(
                    switchMap((response: CreatedResponse) =>
                        this.categoriesService.getById(
                            response.createdResourceId,
                        ),
                    ),
                )
                .subscribe(observer);
        }
    }

    deleteClicked(): void {
        this.dialogRef.close({
            category: this.dialogData.category,
            action: CrudAction.Delete,
        });
    }
}
