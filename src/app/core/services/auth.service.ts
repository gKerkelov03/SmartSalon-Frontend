import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterCustomerRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        private localStorageUtil: LocalStorageService
    ) {}

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.httpClient
            .post<LoginResponse>(
                `${environment.backendUrl}/Auth/Login`,
                credentials
            )
            .pipe(
                tap((response) =>
                    this.localStorageUtil.setItem(
                        jwtTokenKey,
                        response.jwtToken
                    )
                )
            );
    }

    register(customer: RegisterCustomerRequest): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(
            `${environment.backendUrl}/Auth/Register`,
            customer
        );
    }

    logout(): void {
        this.localStorageUtil.deleteItem(jwtTokenKey);
    }
}
