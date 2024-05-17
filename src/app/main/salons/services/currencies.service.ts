import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Currency } from '../models/currency.model';

@Injectable({
    providedIn: 'root',
})
export class CurrenciesService {
    currenciesBackendUrl: string = `${environment.backendUrl}/Currencies`;

    constructor(private httpClient: HttpClient) {}

    searchCurrencies(searchTerm: string): Observable<Currency[]> {
        return this.httpClient.get<Currency[]>(
            `${this.currenciesBackendUrl}/Search`,
            { params: { searchTerm } },
        );
    }

    addCurrency(currencyId: string, salonId: string): Observable<void> {
        return this.httpClient.post<void>(`${this.currenciesBackendUrl}`, {
            currencyId,
            salonId,
        });
    }

    removeCurrency(currencyId: string, salonId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.currenciesBackendUrl}/${currencyId}`,
            { body: { salonId } },
        );
    }
}
