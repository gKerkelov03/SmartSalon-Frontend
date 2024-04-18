import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    usersBackendUrl: string = `${environment.backendUrl}/users/`;

    constructor(private httpClient: HttpClient) {}

    createOwner(user: User): Observable<User> {
        return this.httpClient.post<User>(this.usersBackendUrl, user);
    }

    createWorker(user: User): Observable<User> {
        return this.httpClient.post<User>(this.usersBackendUrl, user);
    }

    createAdmin(user: User): Observable<User> {
        return this.httpClient.post<User>(this.usersBackendUrl, user);
    }

    getById(id: string): Observable<User> {
        return this.httpClient.get<User>(this.usersBackendUrl + id);
    }

    update(id: string, partsToUpdate: Partial<User>): Observable<User> {
        return this.httpClient.patch<User>(
            this.usersBackendUrl + id,
            partsToUpdate
        );
    }

    remove(id: string): Observable<unknown> {
        return this.httpClient.delete<unknown>(this.usersBackendUrl + id);
    }

    changePassword(id: string, pldPass: string, newPass: string): void {}
}
