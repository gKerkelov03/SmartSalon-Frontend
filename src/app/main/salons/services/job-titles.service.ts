import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { JobTitle } from '../models/job-title.model';

@Injectable({
    providedIn: 'root',
})
export class JobTitlesService {
    jobTitlesBackendUrl: string = `${environment.backendUrl}/JobTitles`;

    constructor(private httpClient: HttpClient) {}

    getById(id: string): Observable<JobTitle> {
        return this.httpClient.get<JobTitle>(
            `${this.jobTitlesBackendUrl}/${id}`,
        );
    }

    create(name: string, salonId: string): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(this.jobTitlesBackendUrl, {
            salonId,
            name,
        });
    }

    update(
        text: string,
        salonId: string,
        jobTitleId: string,
    ): Observable<CreatedResponse> {
        return this.httpClient.patch<CreatedResponse>(
            this.jobTitlesBackendUrl,
            {
                salonId,
                jobTitleId,
                text,
            },
        );
    }

    delete(jobTitleId: string, salonId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.jobTitlesBackendUrl}/${jobTitleId}`,
            { body: { salonId } },
        );
    }
}
