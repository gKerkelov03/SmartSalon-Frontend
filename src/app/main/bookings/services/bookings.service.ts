import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Booking } from '../models/bookings.model';

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    bookingsBackendUrl: string = `${environment.backendUrl}/Users/`;

    constructor(private httpClient: HttpClient) {}

    create(booking: Booking): Observable<Booking> {
        return this.httpClient.post<Booking>(this.bookingsBackendUrl, booking);
    }

    getById(id: string): Observable<Booking> {
        return this.httpClient.get<Booking>(this.bookingsBackendUrl + id);
    }

    update(id: string, newBooking: Partial<Booking>): Observable<void> {
        return this.httpClient.patch<void>(
            this.bookingsBackendUrl + id,
            newBooking
        );
    }

    delete(id: string, password: string): Observable<void> {
        return this.httpClient.delete<void>(this.bookingsBackendUrl + id, {
            body: password,
        });
    }
}
