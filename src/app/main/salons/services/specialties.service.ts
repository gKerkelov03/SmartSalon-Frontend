import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { Specialty } from '../models/specialty.model';

@Injectable({
    providedIn: 'root',
})
export class SpecialtiesService {
    specialtiesUrl: string = `${environment.backendUrl}/Specialties/`;

    constructor(private httpClient: HttpClient) {}

    create(text: string, salonId: string): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(this.specialtiesUrl, {
            text,
            salonId,
        });
    }

    getById(id: string): Observable<Specialty> {
        return this.httpClient.get<Specialty>(this.specialtiesUrl + id);
    }

    update(text: string, id: string, salonId: string): Observable<void> {
        return this.httpClient.patch<void>(this.specialtiesUrl + id, {
            text,
            salonId,
        });
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.specialtiesUrl + id);
    }
}
