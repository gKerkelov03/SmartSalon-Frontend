import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmailsService {
    constructor(private httpClient: HttpClient) {}

    changeEmail(token: string): Observable<void> {
        return this.httpClient.patch<void>(
            `${environment.backendUrl}/Users/ChangeEmail?token=${token}`,
            {}
        );
    }

    inviteOwner(token: string): Observable<void> {
        return this.httpClient.patch<void>(
            `${environment.backendUrl}/Owners/AddToSalon?token=${token}`,
            {}
        );
    }

    inviteWorker(token: string): Observable<void> {
        return this.httpClient.patch<void>(
            `${environment.backendUrl}/Workers/AddToSalon?token=${token}`,
            {}
        );
    }

    // IsTokenValid(token: string): Observable<void> {
    //     return this.httpClient.patch<void>(
    //         `${environment.backendUrl}/Users/ConfirmEmail?token=${token}`,
    //         {}
    //     );
    // }
}
