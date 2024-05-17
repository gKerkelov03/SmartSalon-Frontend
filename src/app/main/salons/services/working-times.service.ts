import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DayOfWeek } from '../../../core/enums/day-of-week';
import { WorkingTime } from '../models/working-time.model';

@Injectable({
    providedIn: 'root',
})
export class WorkingTimesService {
    workingTimesBackendUrl: string = `${environment.backendUrl}/WorkingTimes`;

    constructor(private httpClient: HttpClient) {}

    updateWorkingTime(
        salonId: string,
        dayOfWeek: DayOfWeek,
        from: string,
        to: string,
    ) {
        return this.httpClient.patch<void>(
            `${this.workingTimesBackendUrl}/ChangeWorkingTime`,
            { salonId, dayOfWeek, from, to },
        );
    }

    getWorkingTimeById(id: string): Observable<WorkingTime> {
        return this.httpClient.get<WorkingTime>(
            `${this.workingTimesBackendUrl}/${id}`,
        );
    }
}
