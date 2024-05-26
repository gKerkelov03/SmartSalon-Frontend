import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudAction } from '../../../../core/enums/crud-action';
import { getErrorMessages } from '../../../../core/utils/get-error-message';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component({
    selector: 'app-delete-service-dialog',
    templateUrl: './delete-service-dialog.component.html',
    styleUrl: './delete-service-dialog.component.scss',
})
export class DeleteServiceDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: { service: Service; salonId: string },
        private dialogRef: MatDialogRef<DeleteServiceDialogComponent>,
        private servicesService: ServicesService,
        private snackBar: MatSnackBar,
    ) {}

    deleteClicked(): void {
        const observer = {
            next: () => {
                this.dialogRef.close({
                    service: this.dialogData.service,
                    action: CrudAction.Delete,
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessages(httpError), 'Close');
            },
        };

        this.servicesService
            .delete(this.dialogData.service.id, this.dialogData.salonId)
            .subscribe(observer);
    }
}
