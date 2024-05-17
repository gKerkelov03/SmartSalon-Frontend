import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateOwnerRequest } from '../models/create-owner-request.model';
import { Owner } from '../models/owner.model';

@Injectable({
    providedIn: 'root',
})
export class OwnersService {
    ownersBackendUrl: string = `${environment.backendUrl}/Owners/`;

    constructor(private httpClient: HttpClient) {}

    create(newOwner: CreateOwnerRequest): Observable<void> {
        return this.httpClient.post<void>(this.ownersBackendUrl, newOwner);
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
        return this.httpClient.patch<void>(this.ownersBackendUrl, {
            salonId,
            ownerId,
        });
    }
}
