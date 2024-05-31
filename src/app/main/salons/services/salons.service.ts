import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { blankProfilePictureUrl } from '../../../core/constants/urls';
import { isValidUrl } from '../../../core/utils/is-valid-url';
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

    getMany(ids: string[]): Observable<Salon[]> {
        const observables: Observable<Salon>[] = [];

        for (const id of ids) {
            observables.push(this.getById(id));
        }

        return forkJoin(observables);
    }

    getAll(country: string): Observable<Salon[]> {
        return this.httpClient.get<Salon[]>(this.salonsBackendUrl, {
            params: { country },
        });
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.salonsBackendUrl + id);
    }

    update(id: string, newSalon: Salon): Observable<void> {
        return this.httpClient.patch<void>(this.salonsBackendUrl + id, {
            ...newSalon,
            mainCurrencyId: newSalon.mainCurrency.id,
            profilePictureUrl: isValidUrl(newSalon.profilePictureUrl)
                ? newSalon.profilePictureUrl
                : blankProfilePictureUrl,
        });
    }

    sendOwnerInvitation(ownerId: string, salonId: string): Observable<void> {
        return this.httpClient.patch<void>(this.salonsBackendUrl, {
            ownerId,
            salonId,
        });
    }

    sendWorkerInvitation(workerId: string, salonId: string): Observable<void> {
        return this.httpClient.post<void>(
            `${this.salonsBackendUrl}InviteWorker`,
            {
                workerId,
                salonId,
            },
        );
    }
}
