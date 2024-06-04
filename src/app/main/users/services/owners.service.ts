import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { CreateOwnerRequest } from '../models/create-owner-request.model';
import { Owner } from '../models/owner.model';

@Injectable({
    providedIn: 'root',
})
export class OwnersService {
    ownersBackendUrl: string = `${environment.backendUrl}/Owners/`;

    constructor(private httpClient: HttpClient) {}

    create(owner: CreateOwnerRequest): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            `${this.ownersBackendUrl}`,
            owner,
        );
    }

    getById(id: string): Observable<Owner> {
        return this.httpClient.get<Owner>(this.ownersBackendUrl + id);
    }

    getMany(ids: string[]): Observable<Owner[]> {
        const observables: Observable<Owner>[] = [];

        for (const id of ids) {
            observables.push(this.getById(id));
        }

        return forkJoin(observables);
    }

    removeFromSalon(salonId: string, ownerId: string): Observable<void> {
        return this.httpClient.patch<void>(
            this.ownersBackendUrl + 'RemoveFromSalon',
            {
                salonId,
                ownerId,
            },
        );
    }

    search(searchTerm: string): Observable<Owner[]> {
        return this.httpClient.get<Owner[]>(
            `${this.ownersBackendUrl}Search?searchTerm=${searchTerm}`,
        );
    }
}
