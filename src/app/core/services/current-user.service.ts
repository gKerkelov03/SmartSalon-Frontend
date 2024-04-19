import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../enums/role';
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    private currentUserSubject: BehaviorSubject<RegisterResponse | null> =
        new BehaviorSubject<RegisterResponse | null>(null);

    currentUserObservable: Observable<RegisterResponse | null> =
        this.currentUserSubject.asObservable();

    get currentUser(): RegisterResponse | null {
        return this.currentUserSubject.getValue();
    }

    get isCustomer(): boolean {
        return this.hasRole(Role.Customer);
    }

    get isOwner(): boolean {
        return this.hasRole(Role.Owner);
    }

    get isWorker(): boolean {
        return this.hasRole(Role.Worker);
    }

    get isAdmin(): boolean {
        return this.hasRole(Role.Admin);
    }

    setCurrentUser(user: RegisterResponse): void {
        if (user === null) {
            this.clearCurrentUser();
            return;
        }

        this.currentUserSubject.next(user);
    }

    clearCurrentUser(): void {
        this.currentUserSubject.next(null);
    }

    private hasRole(role: Role): boolean {
        return (
            this.currentUserSubject.getValue()?.roles.includes(role) ?? false
        );
    }
}
