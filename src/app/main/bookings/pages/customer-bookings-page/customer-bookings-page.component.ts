import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingsService } from '../../services/bookings.service';

@Component({
    selector: 'app-customer-bookings-page',
    templateUrl: './customer-bookings-page.component.html',
    styleUrl: './customer-bookings-page.component.scss',
})
export class CustomerBookingsPageComponent implements OnInit {
    bookings!: Booking[];

    constructor(bookingsService: BookingsService) {}

    ngOnInit(): void {
        this.fetchBookings();
    }

    fetchBookings(): void {
        this.bookings = [
            {
                id: 'guid',
                date: new Date(),
                startTime: '17:30',
                endTime: '19:30',
                durationInMinutes: 120,

                serviceName: 'Podstrijka dulga kosa s boqdisvane',
                customerName: 'Ivan',
                salonName: 'Gosho salon',
                workerNickname: 'Shabi',
                salonProfilePictureUrl:
                    'https://whyy.org/wp-content/uploads/2018/02/2018-02-02-e-lee-mike-jordan-mark-belle-philadelphia-south-street-barbers-2-768x512.jpg',

                serviceId: 'guid',
                customerId: 'guid',
                salonId: 'guid',
                workerId: 'guid',
            },
            {
                id: 'guid',
                date: new Date(),
                startTime: '17:30',
                endTime: '19:30',
                durationInMinutes: 120,

                customerName: 'Ivan',
                salonName: 'Gosho salon',
                salonProfilePictureUrl:
                    'https://whyy.org/wp-content/uploads/2018/02/2018-02-02-e-lee-mike-jordan-mark-belle-philadelphia-south-street-barbers-2-768x512.jpg',
                workerNickname: 'Shabi',
                serviceName: 'Podstrijka',

                serviceId: 'guid',
                customerId: 'guid',
                salonId: 'guid',
                workerId: 'guid',
            },
        ];
    }
}
