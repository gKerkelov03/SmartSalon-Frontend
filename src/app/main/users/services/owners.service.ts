import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateOwnerRequest } from '../models/create-owner-request.model';
import { Owner } from '../models/owner.model';

@Injectable({
    providedIn: 'root',
})
export class OwnersService {
    ownersBackendUrl: string = `${environment.backendUrl}/Users/`;

    constructor(private httpClient: HttpClient) {}

    create(newOwner: CreateOwnerRequest): Observable<void> {
        return this.httpClient.post<void>(this.ownersBackendUrl, newOwner);
    }

    getById(id: string): Observable<Owner> {
        return this.httpClient.get<Owner>(this.ownersBackendUrl + id);
    }

    removeFromSalon(salonId: string, ownerId: string): Observable<void> {
        return this.httpClient.patch<void>(this.ownersBackendUrl, {
            salonId,
            ownerId,
        });
    }
}
