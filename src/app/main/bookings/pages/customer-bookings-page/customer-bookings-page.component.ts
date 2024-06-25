import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { blankProfilePictureUrl } from '../../../../core/constants/urls';
import { CurrentUserService } from '../../../../core/services/current-user.service';
import { isValidUrl } from '../../../../core/utils/is-valid-url';
import { ConfirmDeletionDialogComponent } from '../../../salons/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-customer-bookings-page',
    templateUrl: './customer-bookings-page.component.html',
    styleUrl: './customer-bookings-page.component.scss',
})
export class CustomerBookingsPageComponent implements OnInit {
    bookings!: Booking[];
    blankProfilePictureUrl = blankProfilePictureUrl;
    isValidUrl = isValidUrl;
    constructor(
        private bookingsService: BookingsService,
        private currentUser: CurrentUserService,
        private dialog: MatDialog,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.fetchBookings();
    }

    fetchBookings(): void {
        this.bookingsService
            .getCustomerBookings(this.currentUser.currentUser!.id)
            .subscribe(
                (bookings: Booking[]) =>
                    (this.bookings = bookings.filter(
                        (booking) => !booking.done,
                    )),
            );
    }

    cancelBooking(bookingForCancellation: Booking): void {
        const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
            width: '40vw',
            autoFocus: false,
            panelClass: 'round-without-padding',
            data: {
                title: 'Are you sure you want to cancel the booking',
                deleteButtonText: 'Cancel',
            },
            enterAnimationDuration: '300ms',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((result: { isDeleted: boolean }) => result.isDeleted),
                switchMap(() =>
                    this.bookingsService.delete(
                        bookingForCancellation.id,
                        bookingForCancellation.salonId,
                        bookingForCancellation.customerId,
                        bookingForCancellation.workerId,
                    ),
                ),
            )
            .subscribe(() =>
                this.bookings.splice(
                    this.bookings.findIndex(
                        (booking) => booking.id == bookingForCancellation.id,
                    ),
                    1,
                ),
            );
    }

    openSalonDetails(salonId: string) {
        this.router.navigate(['/main/salons/' + salonId]);
    }
}
