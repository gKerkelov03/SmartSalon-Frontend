import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterCustomerRequest } from '../models/register-customer-request.model';
import { RegisterCustomerResponse } from '../models/register-customer-response.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loginUrl: string = `${environment.backendUrl}/Authentication/login`;
    registerUrl: string = `${environment.backendUrl}/Users/client`;

    constructor(
        private httpClient: HttpClient,
        private localStorageUtil: LocalStorageService
    ) {}

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.httpClient
            .post<LoginResponse>(this.loginUrl, credentials)
            .pipe(
                tap((response) =>
                    this.localStorageUtil.setItem(
                        jwtTokenKey,
                        response.jwtToken
                    )
                )
            );
    }

    logout(): void {}

    register(
        customer: RegisterCustomerRequest
    ): Observable<RegisterCustomerResponse> {
        return this.httpClient.post<RegisterCustomerResponse>(
            this.registerUrl,
            customer
        );
    }
}
