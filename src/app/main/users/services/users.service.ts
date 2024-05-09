import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    usersBackendUrl: string = `${environment.backendUrl}/Users/`;

    constructor(private httpClient: HttpClient) {}

    getById(id: string): Observable<User> {
        return this.httpClient.get<User>(this.usersBackendUrl + id);
    }

    update(id: string, newUser: Partial<User>): Observable<void> {
        return this.httpClient.patch<void>(this.usersBackendUrl + id, newUser);
    }

    delete(id: string, password: string): Observable<void> {
        return this.httpClient.delete<void>(this.usersBackendUrl + id, {
            body: password,
        });
    }

    changePassword(
        userId: string,
        password: string,
        newPassword: string
    ): Observable<void> {
        return this.httpClient.patch<void>(this.usersBackendUrl + userId, {
            password,
            newPassword,
        });
    }

    restorePassword(token: string, newPassword: string): Observable<void> {
        return this.httpClient.patch<void>(
            `${this.usersBackendUrl}RestorePassword`,
            {
                token,
                newPassword,
            }
        );
    }

    sendEmailConfirmation(
        id: string,
        password: string,
        newEmail: string
    ): Observable<void> {
        return this.httpClient.post<void>(this.usersBackendUrl + id, {
            password,
            newEmail,
        });
    }
}
