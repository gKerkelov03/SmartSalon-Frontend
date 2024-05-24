import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { ServiceRequest } from '../models/service-request.model';
import { Service } from '../models/service.model';

@Injectable({
    providedIn: 'root',
})
export class ServicesService {
    servicesBackendUrl: string = `${environment.backendUrl}/Services/`;

    constructor(private httpClient: HttpClient) {}

    create(service: ServiceRequest): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            this.servicesBackendUrl,
            service,
        );
    }

    getById(id: string): Observable<Service> {
        return this.httpClient.get<Service>(this.servicesBackendUrl + id);
    }

    update(id: string, newService: ServiceRequest): Observable<void> {
        return this.httpClient.patch<void>(
            this.servicesBackendUrl + id,
            newService,
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.servicesBackendUrl + id);
    }
}
