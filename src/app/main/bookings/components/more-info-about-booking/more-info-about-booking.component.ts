import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { CrudAction } from '../../../../core/enums/crud-action';
import { ConfirmDeletionDialogComponent } from '../../../salons/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
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
    noteFormControl: FormControl = new FormControl('');

    constructor(
        private bookingsService: BookingsService,
        @Inject(MAT_DIALOG_DATA)
        public booking: Booking,
        private dialogRef: MatDialogRef<MoreInfoAboutBookingComponent>,
        private dialog: MatDialog,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.isLoading = false;
        this.bookingHoursDuration =
            (this.booking.serviceDurationInMinutes / 60) | 0;
        this.bookingMinutesDuration =
            this.booking.serviceDurationInMinutes % 60;
    }

    deleteIconClicked(): void {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                title: 'Are you sure you want to cancel the booking',
                deleteButtonText: 'Yes',
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((result: { isDeleted: boolean }) => result.isDeleted),
                switchMap(() =>
                    this.bookingsService.delete(
                        this.booking.id,
                        this.booking.salonId,
                        this.booking.customerId,
                        this.booking.workerId,
                    ),
                ),
            )
            .subscribe(() =>
                this.bookingsService.bookingsChangeSubject.next({
                    action: CrudAction.Delete,
                    bookingId: this.booking.id,
                }),
            );
    }

    openBookingsHistory(): void {
        this.dialogRef.close();
        this.router.navigate([
            '/main/bookings/bookings-history/' + this.booking.customerId,
        ]);
    }

    doneClicked(): void {
        this.bookingsService
            .update(this.booking.id, {
                ...this.booking,
                note: this.noteFormControl.value,
                done: true,
            })
            .subscribe(() => {
                this.bookingsService.bookingsChangeSubject.next({
                    action: CrudAction.Delete,
                    bookingId: this.booking.id,
                });

                this.dialogRef.close();
            });
    }

    get canFinishTheBooking() {
        const minutesDifferenceAllowed = 60;
        const bookingDateISOString = `${this.booking.date}T${this.booking.startTime}`;
        const bookingDate = new Date(bookingDateISOString);

        const timeDifference = bookingDate.getTime() - new Date().getTime();
        const minutesDifference = Math.abs(timeDifference / (1000 * 60));

        return minutesDifference <= minutesDifferenceAllowed;
    }
}
