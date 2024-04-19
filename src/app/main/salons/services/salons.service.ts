import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Salon } from '../models/salon.model';

@Injectable({
    providedIn: 'root',
})
export class SalonsService {
    salonsBackendUrl: string = `${environment.backendUrl}/Salons/`;

    constructor(private httpClient: HttpClient) {}

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
