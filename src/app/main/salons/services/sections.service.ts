import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Section } from '../models/section.model';

@Injectable({
    providedIn: 'root',
})
export class SectionsService {
    sectionsBackendUrl: string = `${environment.backendUrl}/Sections/`;

    constructor(private httpClient: HttpClient) {}

    create(section: Section): Observable<void> {
        return this.httpClient.post<void>(this.sectionsBackendUrl, section);
    }

    getById(id: string): Observable<Section> {
        return this.httpClient.get<Section>(this.sectionsBackendUrl + id);
    }

    getMany(ids: string[]): Observable<Section[]> {
        const observables: Observable<Section>[] = [];

        for (const id of ids) {
            observables.push(this.getById(id));
        }

        return forkJoin(observables);
    }

    update(id: string, newSection: Partial<Section>): Observable<void> {
        return this.httpClient.patch<void>(
            this.sectionsBackendUrl + id,
            newSection,
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.sectionsBackendUrl + id);
    }
}
