import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudAction } from '../../../../core/enums/crud-action';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-delete-category-dialog',
    templateUrl: './delete-category-dialog.component.html',
    styleUrl: './delete-category-dialog.component.scss',
})
export class DeleteCategoryDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { category: Category; salonId: string },
        private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
        private categoriesService: CategoriesService,
        private snackBar: MatSnackBar,
    ) {}

    deleteClicked(): void {
        const observer = {
            next: () => {
                this.dialogRef.close({
                    category: this.dialogData.category,
                    action: CrudAction.Delete,
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.categoriesService
            .delete(this.dialogData.category.id, this.dialogData.salonId)
            .subscribe(observer);
    }
}
