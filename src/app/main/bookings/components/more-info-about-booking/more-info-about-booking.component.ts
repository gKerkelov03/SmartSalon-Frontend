import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';
import { BookingsFormComponent } from '../bookings-form/bookings-form.component';
import { DeleteBookingDialogComponent } from '../delete-booking-dialog/delete-booking-dialog.component';

@Component({
    selector: 'app-more-info-about-booking',
    templateUrl: './more-info-about-booking.component.html',
    styleUrls: ['./more-info-about-booking.component.scss'],
})
export class MoreInfoAboutBookingComponent implements OnInit {
    isLoading: boolean = false;
    bookingToDisplay!: Booking;
    bookingHoursDuration!: number;
    bookingMinutesDuration!: number;
    startDate!: string;
    startTime!: string;

    constructor(
        private bookingsService: BookingsService,
        @Inject(MAT_DIALOG_DATA)
        private bookingId: string,
        private dialogRef: MatDialogRef<MoreInfoAboutBookingComponent>,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.bookingsService
            .getById(this.bookingId)
            .pipe(take(1))
            .subscribe((booking: Booking) => {
                this.isLoading = false;
                this.bookingToDisplay = booking;
                this.bookingHoursDuration =
                    (booking.durationInMinutes / 60) | 0;
                this.bookingMinutesDuration = booking.durationInMinutes % 60;

                this.startDate = booking.startTime.toString().split('T')[0];

                this.startTime = new Date(booking.startTime).toLocaleTimeString(
                    'en-US',
                    {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                    }
                );
            });
    }

    editIconClicked(): void {
        this.dialogRef.close();

        this.dialog.open(BookingsFormComponent, {
            width: '60vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: this.bookingId,
        });
    }

    deleteIconClicked(): void {
        const deleteBookingDialogRef = this.dialog.open(
            DeleteBookingDialogComponent,
            {
                data: this.bookingId,
                autoFocus: false,
                panelClass: 'round-without-padding',
            }
        );

        deleteBookingDialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((isDeletedSuccessfully: boolean) => {
                if (isDeletedSuccessfully) {
                    this.snackBar.open('Successfully deleted an booking', 'Ok');
                    this.dialogRef.close();
                }
            });
    }
}
