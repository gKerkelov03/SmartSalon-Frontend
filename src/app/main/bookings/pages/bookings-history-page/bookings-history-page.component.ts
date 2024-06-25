import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { idRouteParameterName } from '../../../../core/constants/routing';
import { User } from '../../../users/models/user.model';
import { UsersService } from '../../../users/services/users.service';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-bookings-history-page',
    templateUrl: './bookings-history-page.component.html',
    styleUrl: './bookings-history-page.component.scss',
})
export class BookingsHistoryPageComponent {
    bookings!: Booking[];
    customer!: User;

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private bookingsService: BookingsService,
    ) {}
    ngOnInit(): void {
        this.fetchBookings();
    }

    fetchBookings(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    const customerId = params.get(idRouteParameterName) ?? '';
                    this.fetchCustomer(customerId);
                    return this.bookingsService.getCustomerBookings(customerId);
                }),
            )
            .subscribe((bookings: Booking[]) => {
                this.bookings = bookings.filter((booking) => booking.done);
                this.bookings.sort(
                    (a, b) =>
                        Number(new Date(b.date + 'T' + b.startTime)) -
                        Number(new Date(a.date + 'T' + a.startTime)),
                );
            });
    }

    fetchCustomer(id: string): void {
        this.usersService
            .getById(id)
            .subscribe((user) => (this.customer = user));
    }

    deleteBooking(bookingToDelete: Booking): void {
        this.bookings = this.bookings.filter(
            (booking) => booking.id != bookingToDelete.id,
        );

        this.bookingsService
            .delete(
                bookingToDelete.id,
                bookingToDelete.salonId,
                bookingToDelete.customerId,
                bookingToDelete.workerId,
            )
            .subscribe();
    }
}
