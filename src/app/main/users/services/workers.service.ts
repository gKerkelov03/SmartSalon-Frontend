import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Worker } from '../../users/models/worker.model';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    workersBackendUrl: string = `${environment.backendUrl}/Workers/`;

    constructor(private httpClient: HttpClient) {}

    getById(id: string): Observable<Worker> {
        return this.httpClient.get<Worker>(this.workersBackendUrl + id);
    }

    getMany(ids: string[]): Observable<Worker[]> {
        const observables: Observable<Worker>[] = [];

        for (const id of ids) {
            observables.push(this.getById(id));
        }

        return forkJoin(observables);
    }

    update(id: string, newUser: Partial<Worker>): Observable<void> {
        return this.httpClient.patch<void>(
            this.workersBackendUrl + id,
            newUser,
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.workersBackendUrl + id);
    }
}
