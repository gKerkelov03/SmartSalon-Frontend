import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DayOfWeek } from '../../../core/enums/day-of-week';
import { Salon } from '../models/salon.model';

@Injectable({
    providedIn: 'root',
})
export class SalonsService {
    salonsBackendUrl: string = `${environment.backendUrl}/Salons/`;

    constructor(private httpClient: HttpClient) {}

    create(salon: Salon): Observable<void> {
        return this.httpClient.post<void>(this.salonsBackendUrl, salon);
    }

    getById(id: string): Observable<Salon> {
        return this.httpClient.get<Salon>(this.salonsBackendUrl + id);
    }

    update(id: string, newSalon: Partial<Salon>): Observable<void> {
        return this.httpClient.patch<void>(
            this.salonsBackendUrl + id,
            newSalon
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.salonsBackendUrl + id);
    }

    addImage(url: string): Observable<void> {
        return this.httpClient.post<void>(
            `${this.salonsBackendUrl}/AddImage/${url}`,
            {}
        );
    }

    removeImage(imageId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.salonsBackendUrl}/RemoveImage/${imageId}`
        );
    }

    addCurrency(currencyId: string): Observable<void> {
        return this.httpClient.post<void>(
            `${this.salonsBackendUrl}/AddCurrency/${currencyId}`,
            {}
        );
    }

    removeCurrency(currencyId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.salonsBackendUrl}/RemoveCurrency/${currencyId}`
        );
    }

    updateWorkingTime(
        salonId: string,
        dayOfWeek: DayOfWeek,
        from: string,
        to: string
    ) {
        return this.httpClient.patch<void>(
            `${this.salonsBackendUrl}/ChangeWorkingTime`,
            { salonId, dayOfWeek, from, to }
        );
    }

    sendOwnerInvitation(
        id: string,
        password: string,
        newPassword: string
    ): Observable<void> {
        return this.httpClient.patch<void>(this.salonsBackendUrl + id, {
            password,
            newPassword,
        });
    }

    sendWorkerInvitation(
        id: string,
        password: string,
        newEmail: string
    ): Observable<void> {
        return this.httpClient.post<void>(this.salonsBackendUrl + id, {
            password,
            newEmail,
        });
    }
}
