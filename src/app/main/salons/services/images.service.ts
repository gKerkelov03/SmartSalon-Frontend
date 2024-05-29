import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { Image } from '../models/image.model';

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    imagesBackendUrl: string = `${environment.backendUrl}/Images/`;

    constructor(private httpClient: HttpClient) {}

    addImage(url: string, salonId: string): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            `${this.imagesBackendUrl}`,
            { url, salonId },
        );
    }

    getById(id: string): Observable<Image> {
        return this.httpClient.get<Image>(this.imagesBackendUrl + id);
    }

    removeImage(imageId: string, salonId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.imagesBackendUrl}${imageId}`,
            { body: { salonId } },
        );
    }
}
