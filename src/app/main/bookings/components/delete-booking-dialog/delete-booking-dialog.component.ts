import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { getErrorMessage } from '../../../../core/utils/get-error-message';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-delete-booking-dialog',
    templateUrl: './delete-booking-dialog.component.html',
    styleUrls: ['./delete-booking-dialog.component.scss'],
})
export class DeleteBookingDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public bookingId: string,
        private dialogRef: MatDialogRef<DeleteBookingDialogComponent>,
        private bookingsService: BookingsService,
        private snackBar: MatSnackBar
    ) {}

    deleteEvent(): void {
        const observer = {
            next: () => {
                this.dialogRef.close(this.bookingId);
                this.bookingsService.bookingsChangeSubject.next({
                    action: CrudAction.Deleted,
                    bookingId: this.bookingId,
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.snackBar.open(getErrorMessage(httpError), 'Close');
            },
        };

        this.bookingsService
            .delete(this.bookingId.toString())
            .pipe(take(1))
            .subscribe(observer);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
