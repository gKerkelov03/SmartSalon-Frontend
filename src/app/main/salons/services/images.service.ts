import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    salonsBackendUrl: string = `${environment.backendUrl}/Images/`;

    constructor(private httpClient: HttpClient) {}

    addImage(url: string, salonId: string): Observable<void> {
        return this.httpClient.post<void>(
            `${this.salonsBackendUrl}/AddImage/`,
            { url, salonId },
        );
    }

    removeImage(imageId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.salonsBackendUrl}/RemoveImage/${imageId}`,
        );
    }
}
