import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Specialty } from '../models/specialty.model';

@Injectable({
    providedIn: 'root',
})
export class SpecialtiesService {
    specialtiesUrl: string = `${environment.backendUrl}/Categories/`;

    constructor(private httpClient: HttpClient) {}

    create(specialty: Specialty): Observable<void> {
        return this.httpClient.post<void>(this.specialtiesUrl, specialty);
    }

    getById(id: string): Observable<Specialty> {
        return this.httpClient.get<Specialty>(this.specialtiesUrl + id);
    }

    update(id: string, newCategory: Partial<Specialty>): Observable<void> {
        return this.httpClient.patch<void>(
            this.specialtiesUrl + id,
            newCategory
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.specialtiesUrl + id);
    }
}
