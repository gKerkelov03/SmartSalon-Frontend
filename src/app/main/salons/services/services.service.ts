import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Service } from '../models/service.model';

@Injectable({
    providedIn: 'root',
})
export class ServicesService {
    servicesBackendUrl: string = `${environment.backendUrl}/Services/`;

    constructor(private httpClient: HttpClient) {}

    create(service: Service): Observable<void> {
        return this.httpClient.post<void>(this.servicesBackendUrl, service);
    }

    getById(id: string): Observable<Service> {
        return this.httpClient.get<Service>(this.servicesBackendUrl + id);
    }

    update(id: string, newService: Partial<Service>): Observable<void> {
        return this.httpClient.patch<void>(
            this.servicesBackendUrl + id,
            newService
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.servicesBackendUrl + id);
    }
}
