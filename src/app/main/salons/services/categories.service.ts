import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    categoriesBackendUrl: string = `${environment.backendUrl}/Categories/`;

    constructor(private httpClient: HttpClient) {}

    create(category: Category): Observable<void> {
        return this.httpClient.post<void>(this.categoriesBackendUrl, category);
    }

    getById(id: string): Observable<Category> {
        return this.httpClient.get<Category>(this.categoriesBackendUrl + id);
    }

    update(id: string, newCategory: Partial<Category>): Observable<void> {
        return this.httpClient.patch<void>(
            this.categoriesBackendUrl + id,
            newCategory
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(this.categoriesBackendUrl + id);
    }
}
