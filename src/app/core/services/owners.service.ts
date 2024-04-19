import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Salon } from '../../main/salons/models/salon.model';

@Injectable({
    providedIn: 'root',
})
export class OwnersService {
    ownersBackendUrl: string = `${environment.backendUrl}/Users/`;

    constructor(private httpClient: HttpClient) {}

    getById(id: string): Observable<Salon> {
        return this.httpClient.get<Salon>(this.ownersBackendUrl + id);
    }

    update(id: string, newUser: Partial<Salon>): Observable<void> {
        return this.httpClient.patch<void>(this.ownersBackendUrl + id, newUser);
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.ownersBackendUrl + id);
    }
}
