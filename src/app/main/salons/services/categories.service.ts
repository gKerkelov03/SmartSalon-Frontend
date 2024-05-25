import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreatedResponse } from '../../../core/models/created-response.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    categoriesBackendUrl: string = `${environment.backendUrl}/Categories/`;

    constructor(private httpClient: HttpClient) {}

    create(
        name: string,
        sectionId: string,
        salonId: string,
    ): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            this.categoriesBackendUrl,
            {
                name,
                sectionId,
                salonId,
            },
        );
    }

    getById(id: string): Observable<Category> {
        return this.httpClient.get<Category>(this.categoriesBackendUrl + id);
    }

    update(
        id: string,
        newCategory: Category,
        salonId: string,
    ): Observable<void> {
        return this.httpClient.patch<void>(this.categoriesBackendUrl + id, {
            ...newCategory,
            salonId,
        });
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.categoriesBackendUrl + id);
    }
}
