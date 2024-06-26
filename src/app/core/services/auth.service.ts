import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtTokenKey } from '../constants/local-storage-keys';
import { CreatedResponse } from '../models/created-response.model';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterRequest } from '../models/register-request.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        private localStorageUtil: LocalStorageService,
    ) {}

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.httpClient
            .post<LoginResponse>(
                `${environment.backendUrl}/Auth/Login`,
                request,
            )
            .pipe(
                tap((response) =>
                    this.localStorageUtil.setItem(
                        jwtTokenKey,
                        response.jwtToken,
                    ),
                ),
            );
    }

    register(user: RegisterRequest): Observable<CreatedResponse> {
        return this.httpClient.post<CreatedResponse>(
            `${environment.backendUrl}/Auth/Register`,
            user,
        );
    }

    logout(): void {
        this.localStorageUtil.deleteItem(jwtTokenKey);
    }
}
