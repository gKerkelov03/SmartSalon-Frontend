import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BookingChange } from '../models/booking-change-model';
import { Booking } from '../models/booking.model';
import { TimeSlot } from '../models/time-slot.model';

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    bookingsBackendUrl: string = `${environment.backendUrl}/Bookings/`;
    bookingsChangeSubject: Subject<BookingChange> = new Subject();

    constructor(private httpClient: HttpClient) {}

    create(booking: Booking): Observable<Booking> {
        return this.httpClient.post<Booking>(this.bookingsBackendUrl, booking);
    }

    getById(id: string): Observable<Booking> {
        return this.httpClient.get<Booking>(this.bookingsBackendUrl + id);
    }

    getAvailableTimeSlots(request: {
        serviceId: string;
        workerId: string;
        customerId: string;
        salonId: string;
        date: string;
    }): Observable<TimeSlot[]> {
        return this.httpClient.post<TimeSlot[]>(
            this.bookingsBackendUrl + 'GetAvailableTimeSlots',
            request,
        );
    }

    getCustomerBookings(customerId: string): Observable<Booking[]> {
        return this.httpClient.get<Booking[]>(
            `${this.bookingsBackendUrl}GetCustomerBookings/${customerId}`,
        );
    }

    getWorkerBookings(workerId: string): Observable<Booking[]> {
        return this.httpClient.get<Booking[]>(
            `${this.bookingsBackendUrl}GetWorkerBookings/${workerId}`,
        );
    }

    update(id: string, newBooking: Partial<Booking>): Observable<void> {
        return this.httpClient.patch<void>(this.bookingsBackendUrl + id, {
            ...newBooking,
            workerId: newBooking.workerId,
        });
    }

    delete(
        id: string,
        salonId: string,
        customerId: string,
        workerId: string,
    ): Observable<void> {
        return this.httpClient.delete<void>(this.bookingsBackendUrl + id, {
            body: { salonId, customerId, workerId },
        });
    }
}
