import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DayOfWeek } from '../../../core/enums/day-of-week';

@Injectable({
    providedIn: 'root',
})
export class WorkingTimesService {
    salonsBackendUrl: string = `${environment.backendUrl}/Salons/`;

    constructor(private httpClient: HttpClient) {}

    updateWorkingTime(
        salonId: string,
        dayOfWeek: DayOfWeek,
        from: string,
        to: string
    ) {
        return this.httpClient.patch<void>(
            `${this.salonsBackendUrl}/ChangeWorkingTime`,
            { salonId, dayOfWeek, from, to }
        );
    }
}
