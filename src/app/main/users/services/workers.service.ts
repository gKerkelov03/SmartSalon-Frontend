import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { Worker } from '../../users/models/worker.model';
import { CreateWorkerRequest } from '../models/create-worker-request.model';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    workersBackendUrl: string = `${environment.backendUrl}/Workers/`;

    create(worker: CreateWorkerRequest): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            `${this.workersBackendUrl}`,
            worker,
        );
    }

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

    updateWorkerJobTitles(
        workerId: string,
        salonId: string,
        jobTitlesIds: string[],
    ): Observable<void> {
        return this.httpClient.patch<void>(
            this.workersBackendUrl + 'UpdateJobTitles/' + workerId,
            {
                salonId,
                jobTitlesIds,
            },
        );
    }

    updateWorkerNickname(workerId: string, nickname: string): Observable<void> {
        return this.httpClient.patch<void>(
            this.workersBackendUrl + 'UpdateNickname/' + workerId,
            {
                nickname,
            },
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.workersBackendUrl + id);
    }
}
