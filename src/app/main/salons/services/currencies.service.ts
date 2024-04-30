import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CurrenciesService {
    currenciesBackendUrl: string = `${environment.backendUrl}/Salons/`;

    constructor(private httpClient: HttpClient) {}

    addCurrency(currencyId: string): Observable<void> {
        return this.httpClient.post<void>(
            `${this.currenciesBackendUrl}/AddCurrency/${currencyId}`,
            {}
        );
    }

    removeCurrency(currencyId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.currenciesBackendUrl}/RemoveCurrency/${currencyId}`
        );
    }
}
