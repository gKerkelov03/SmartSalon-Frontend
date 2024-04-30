import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    workersBackendUrl: string = `${environment.backendUrl}/Users/`;

    constructor(private httpClient: HttpClient) {}

    getById(id: string): Observable<Worker> {
        return this.httpClient.get<Worker>(this.workersBackendUrl + id);
    }

    update(id: string, newUser: Partial<Worker>): Observable<void> {
        return this.httpClient.patch<void>(
            this.workersBackendUrl + id,
            newUser
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.workersBackendUrl + id);
    }
}
