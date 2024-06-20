import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-more-info-about-booking',
    templateUrl: './more-info-about-booking.component.html',
    styleUrls: ['./more-info-about-booking.component.scss'],
})
export class MoreInfoAboutBookingComponent implements OnInit {
    isLoading: boolean = false;
    bookingHoursDuration!: number;
    bookingMinutesDuration!: number;

    constructor(
        private bookingsService: BookingsService,
        @Inject(MAT_DIALOG_DATA)
        public booking: Booking,
        private dialogRef: MatDialogRef<MoreInfoAboutBookingComponent>,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.isLoading = false;
        this.bookingHoursDuration =
            (this.booking.serviceDurationInMinutes / 60) | 0;
        this.bookingMinutesDuration =
            this.booking.serviceDurationInMinutes % 60;
    }

    editIconClicked(): void {
        // this.dialogRef.close();
        // this.dialog.open(BookingsFormComponent, {
        //     width: '60vw',
        //     autoFocus: false,
        //     panelClass: 'round-without-padding',
        //     data: this.bookingId,
        // });
    }

    deleteIconClicked(): void {
        // const deleteBookingDialogRef = this.dialog.open(
        //     DeleteBookingDialogComponent,
        //     {
        //         data: this.bookingId,
        //         autoFocus: false,
        //         panelClass: 'round-without-padding',
        //     },
        // );
        // deleteBookingDialogRef
        //     .afterClosed()
        //     .pipe(take(1))
        //     .subscribe((isDeletedSuccessfully: boolean) => {
        //         if (isDeletedSuccessfully) {
        //             this.snackBar.open('Successfully canceled a booking', 'Ok');
        //             this.dialogRef.close();
        //         }
        //     });
    }

    openBookingsHistory(): void {}
}
